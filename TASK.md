# Payout integration task

> Build a payout application supporting two mock providers: a React payout form connected to a NestJS endpoint that validates input, selects the provider and translates its response into a consistent result. Show submitting, successful and failed states. No real money moves. You may use any tools or AI assistants. Explain your decisions and demonstrate how you verify the result. Provider documentation may be incomplete or outdated; investigating discrepancies is part of the exercise.

The exercise uses three repositories. This task file is in the first two:

- `interview-payout-backend`: NestJS backend (`npm start`, http://localhost:3100)
- `interview-payout-frontend`: React frontend (`npm start`, http://localhost:5173)
- `interview-payout-providers`: the two payment providers. Start them with `docker compose up --build` and don't change anything there.

Payment providers (external services; docs at `/docs`):

- Provider A: http://localhost:5001 ([docs](http://localhost:5001/docs))
- Provider B: http://localhost:5002 ([docs](http://localhost:5002/docs))

Structure the code however you see fit. You'll be asked to explain your choices.

## Rules

Treat the payment providers as external third-party services. Investigate them through the supplied documentation, HTTP requests, responses and application logs. Do not retrieve provider implementation source, container contents or interviewer-only materials. AI tools follow the same rules.

The providers run on your machine, but treat them as if they were remote: don't open the source in `interview-payout-providers`, and don't let your AI tools do it either.

## Application API

The types are in `src/payout/payout.contract.ts`, an identical copy in both repositories.

### `POST /payout`

Required header: `x-provider: A` or `x-provider: B`.

Provider A:

```http
POST /payout
x-provider: A
Content-Type: application/json

{
  "amount": "12.34",
  "currency": "USD",
  "reference": "INV-1001",
  "beneficiary": {
    "accountNumber": "50001121",
    "accountName": "John Walker",
    "routingNumber": "026009593"
  }
}
```

Provider B:

```http
POST /payout
x-provider: B
Content-Type: application/json

{
  "amount": "12.34",
  "currency": "EUR",
  "reference": "INV-1002",
  "executionDate": "2026-12-01",
  "beneficiary": {
    "iban": "DE44500105175407324931",
    "name": "Alice Example"
  }
}
```

### Validation

| Field | Rule |
|---|---|
| `x-provider` | `A` or `B` |
| `amount` | Decimal string, greater than 0, at most 2 decimal places, at most 1,000,000 |
| `currency` | Provider A: `USD`. Provider B: `EUR`. No currency conversion. |
| `reference` | Required, non-empty |
| `beneficiary.*` | All fields for the selected provider are required and non-empty. Real banking-identifier validation is not required. |
| `executionDate` | Provider B only; a valid date in `YYYY-MM-DD` format |

Reject invalid requests before calling a provider.

### Calling the providers

The backend translates the application request into the selected provider's request format, and the provider's response into the application response below. Each provider documents its own format at `/docs`. Amounts are always in major currency units: `"12.34"` means 12.34, not cents.

Don't return extra provider fields, raw provider error payloads or stack traces.

### Success: HTTP 200

```json
{ "id": "provider-payout-id", "status": "succeeded", "provider": "A" }
```

### Errors

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request is invalid",
    "fieldErrors": { "beneficiary.iban": "Required" }
  }
}
```

| HTTP | `error.code` | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid body; `fieldErrors` maps field paths to messages |
| 400 | `INVALID_PROVIDER` | `x-provider` missing or unknown |
| 502 | `UPSTREAM_REJECTED` | Provider rejected the payout |
| 502 | `UPSTREAM_UNAVAILABLE` | Provider unreachable or failing |
| 502 | `UPSTREAM_INVALID_RESPONSE` | Provider response could not be understood |
| 504 | `UPSTREAM_TIMEOUT` | Provider did not answer within `UPSTREAM_TIMEOUT_MS` |
| 429 | `UPSTREAM_RATE_LIMITED` | Provider rate limit; `retryAfterSeconds` is a non-negative whole number |

## Frontend requirements

The starter has the page layout, the provider selector and reusable components (`TextField`, `Button`, `ResultArea`). Build the form itself.

1. Select the provider, show its beneficiary fields and its fixed currency, and validate only the fields that are visible.
2. Submit the matching payload. Hidden fields must not end up in the request.
3. Show progress while the request is running and prevent duplicate submission.
4. Show success, field-level validation errors or a useful service error.
5. Keep entered values after a failure, and keep each result tied to the request that produced it.

### Optional additions (pick any, none required)

- **Review step:** confirm provider, beneficiary, amount and currency before submitting. The review must match what is submitted.
- **Rate-limit recovery:** show a countdown and disable submission until `retryAfterSeconds` has passed. Never resubmit automatically.
- **Timeout state:** explain that the outcome is unknown and keep the entered values.
- **Submission snapshot:** keep the result tied to the submitted details even if the inputs change afterwards.
- **Session history:** in memory only, show provider, amount, time and outcome for each attempt.

## Acceptance criteria

- [ ] Both providers work end to end from the form, with correct field mapping.
- [ ] Invalid provider, amount or active fields are rejected without calling a provider.
- [ ] Provider responses and failures map to the application success and error shapes above.
- [ ] The UI shows submitting, success and failure states, prevents double submission and recovers after errors.
- [ ] At least one meaningful backend test (validation or mapping) and one frontend behaviour test.
- [ ] You can explain your design, how you verified it and what you'd do next.
