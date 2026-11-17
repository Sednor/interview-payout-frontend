/** Base URL of the payment service (interview-payout-backend). Override with VITE_API_BASE_URL in .env.local. */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3100';
