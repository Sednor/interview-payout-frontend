# Interview Payout Frontend (React + Vite)

Frontend for the payout exercise. A single payout form that calls the payment service API (`interview-payout-backend`).

```
interview-payout-frontend (this repo)  ──►  interview-payout-backend  ──►  Provider A / Provider B
       localhost:5173                         localhost:3100              localhost:5001 / 5002
```

## Prerequisites

- Node.js 22 or newer (`.nvmrc` pins 22) and npm
- `interview-payout-backend` running on http://localhost:3100

## Setup

```bash
npm ci
cp .env.example .env.local   # optional: the default API URL is http://localhost:3100
npm start                    # http://localhost:5173
```

The dev server always uses port 5173 because the backend allows CORS from that origin only. If the port is busy, Vite stops with an error instead of switching to another port.

## Commands

| Command | Purpose |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm test` | Run the Vitest tests (`*.test.tsx`) once |
| `npm run test:watch` | Run the tests in watch mode |
| `npm run typecheck` | Type-check |
| `npm run build` | Type-check and build to `dist/` |
| `npm run format` | Format with Prettier |

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3100` | Payment service base URL, read in `src/config.ts` |

## Project layout

```
src/
  App.tsx                      page layout: form card and result card
  config.ts                    API base URL
  styles.css                   all styles
  components/
    TextField.tsx              labelled input with hint and error message
    Button.tsx                 primary and secondary button
    ResultArea.tsx             live region for success and error messages
  payout/
    PayoutForm.tsx             form shell with the provider selector (fields not built yet)
    ProviderSelector.tsx       provider A / B radio group
    payout.contract.ts         application API request/response types
  test/setup.ts                Testing Library and jest-dom setup
```

Tests use Vitest, jsdom, Testing Library and `user-event`. See `src/components/TextField.test.tsx` for an example.
