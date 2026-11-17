/**
 * Application API contract for POST /payout.
 * The backend (interview-payout-backend) and frontend (interview-payout-frontend) share this file verbatim.
 * See TASK.md for examples and validation rules.
 */

/** Value of the required `x-provider` request header. */
export type ProviderId = 'A' | 'B';

// ---------- Request ----------

export interface ProviderABeneficiary {
  accountNumber: string;
  accountName: string;
  routingNumber: string;
}

export interface ProviderBBeneficiary {
  iban: string;
  name: string;
}

interface PayoutRequestBase {
  /** Decimal string in major currency units, e.g. "12.34". Positive, max 2 decimal places, max 1,000,000. */
  amount: string;
  /** Free-text payment reference, e.g. an invoice number. */
  reference: string;
}

/** Body sent with `x-provider: A`. */
export interface ProviderAPayoutRequest extends PayoutRequestBase {
  currency: 'USD';
  beneficiary: ProviderABeneficiary;
}

/** Body sent with `x-provider: B`. */
export interface ProviderBPayoutRequest extends PayoutRequestBase {
  currency: 'EUR';
  beneficiary: ProviderBBeneficiary;
  /** Calendar date in YYYY-MM-DD format. */
  executionDate: string;
}

export type PayoutRequest = ProviderAPayoutRequest | ProviderBPayoutRequest;

// ---------- Success response (HTTP 200) ----------

export interface PayoutSuccessResponse {
  /** Provider's identifier for the payout. */
  id: string;
  status: 'succeeded';
  provider: ProviderId;
}

// ---------- Error response ----------

/** See the error table in TASK.md for the HTTP status of each code. */
export type PayoutErrorCode =
  | 'VALIDATION_ERROR'
  | 'INVALID_PROVIDER'
  | 'UPSTREAM_REJECTED'
  | 'UPSTREAM_UNAVAILABLE'
  | 'UPSTREAM_INVALID_RESPONSE'
  | 'UPSTREAM_TIMEOUT'
  | 'UPSTREAM_RATE_LIMITED';

export interface PayoutErrorResponse {
  error: {
    code: PayoutErrorCode;
    /** Human-readable message that is safe to show to the user. */
    message: string;
    /** Validation errors keyed by field path, e.g. { "beneficiary.iban": "Required" }. */
    fieldErrors?: Record<string, string>;
    /** Non-negative whole number of seconds to wait before trying again. */
    retryAfterSeconds?: number;
  };
}
