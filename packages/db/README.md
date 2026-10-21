# Database package

This package owns PostgreSQL access, Prisma schema and versioned migrations.

- Put domain models and migration changes here, not inside the Express or Next.js applications.
- Apply schema changes through `pnpm --filter @skill-swap/db db:migrate -- --name <migration-name>`.
- The initial `User` model exists only to verify the bootstrap toolchain; evolve it through reviewed issues and migrations.
- Copy the repository root `.env.example` to `.env` before generating the Prisma client.
