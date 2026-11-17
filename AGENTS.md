# AGENTS.md

## Rules

Treat the payment providers as external third-party services. Investigate them through the supplied documentation, HTTP requests, responses and application logs. Do not retrieve provider implementation source, container contents or interviewer-only materials. AI tools follow the same rules.

## Project

- React 19, Vite 8, TypeScript 5, Node.js 22+, npm (exact versions; `package-lock.json` is committed).
- Task and API contract: `TASK.md`. Request/response types: `src/payout/payout.contract.ts`.
- API base URL: `src/config.ts` (`VITE_API_BASE_URL`, default http://localhost:3100).
- The backend lives in a separate repository (`interview-payout-backend`). The payment providers run from `interview-payout-providers`. Use them only over HTTP, and never open or search the provider source.

## Commands

- `npm start`: dev server on http://localhost:5173
- `npm test`: Vitest + Testing Library (`*.test.tsx`, next to the code)
- `npm run typecheck`: type-check
