# Technical bootstrap

This is an additive starter pack for the initial technical milestone. It does not replace product decisions in `README.md`, `AGENTS.md`, or the existing docs.

## Prerequisites

- Node.js 24.11 or newer on the 24.x line
- pnpm 12.14.0
- Docker with Docker Compose

## Local setup

1. Copy `.env.example` to `.env` in the repository root.
2. Install workspace dependencies: `pnpm install`.
3. Start PostgreSQL: `pnpm db:up`.
4. Generate the Prisma client: `pnpm db:generate`.
5. Create the initial local database migration: `pnpm --filter @skill-swap/db db:migrate -- --name bootstrap`.
6. Run all checks: `pnpm check`.
7. Start web and API together: `pnpm dev`.

The web application is available at http://localhost:3000. The API health endpoint is http://localhost:4000/health. The PostgreSQL service is available on localhost:5432.

## First setup commit

Commit the generated `pnpm-lock.yaml` after `pnpm install`. Do not commit `.env`, `node_modules`, build output, or generated Prisma client output.

The CI workflow requires `pnpm-lock.yaml` and runs `pnpm install --frozen-lockfile`; generate and commit the lockfile before relying on CI.

## Boundaries

- The frontend talks to Express, not directly to PostgreSQL.
- The API does not yet implement product endpoints; `/health` only verifies that the server starts.
- The initial `User` database model is a toolchain smoke test, not a complete auth model.
- No login, credit ledger, skill exchange, or PM IA action is implemented by this pack.
- PM automation remains a future task and must not receive write-capable tokens until its actions have been validated.
