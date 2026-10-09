# Admin Dashboard Learning Project

A Next.js sandbox project for learning and practicing production-oriented frontend and full-stack concepts.

This repository is intentionally used as a learning environment before building the final portfolio Admin Dashboard in a separate clean repository.

There is intentionally no CSS or visual styling in this repository, because it is a sandbox focused on architecture, data flow, testing, authentication, and application logic rather than UI polish.

## Tech Stack

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma ORM
- Auth.js / NextAuth.js
- Zod
- Vitest
- React Testing Library
- Tailwind CSS
- pnpm

## Current Learning Scope

Implemented so far:

- App Router
- Server and Client Components
- Dynamic routes
- Search with URL state
- Filtering
- Sorting
- Pagination
- Suspense and streaming
- Error handling
- Forms and Server Actions
- Zod validation
- CRUD operations
- Advanced Server Actions
- Optimistic UI
- PostgreSQL
- Prisma ORM
- Database migrations
- Database seeding
- Prisma Studio
- Data Layer / Repository pattern
- Auth.js base setup
- Prisma Auth.js adapter
- Auth database models

In progress / upcoming:

- Google OAuth
- GitHub OAuth
- Sessions
- Protected routes
- Role-Based Access Control (RBAC)
- User management
- Route Handlers and custom API
- Caching and revalidation
- Parallel data fetching
- Advanced Suspense and streaming architecture

## Project Purpose

This repository is a sandbox.

It intentionally contains:

- learning exercises
- refactors
- testing practice
- experimental branches
- implementation iterations
- architecture exercises
- Git and pull request practice

The final portfolio Admin Dashboard will be created later in a separate clean repository with a cleaner Git history and production-oriented architecture.

## Requirements

Before running the project locally, make sure the following are installed:

- Node.js
- pnpm
- PostgreSQL

## Install Dependencies

```bash
pnpm install
```

## Environment Variables

Create a local `.env` file in the project root.

Example:

```env
DATABASE_URL="postgresql://username@localhost:5432/database_name?schema=public"
AUTH_SECRET="your-generated-auth-secret"
```

Do not commit real credentials or secrets.

Make sure `.env` is included in `.gitignore`.

## PostgreSQL

The project uses PostgreSQL as the database.

For local development, create a PostgreSQL database and update `DATABASE_URL` in `.env`.

Example:

```text
postgresql://username@localhost:5432/database_name?schema=public
```

## Prisma

### Validate the Prisma schema

```bash
pnpm exec prisma validate
```

### Run migrations

```bash
pnpm exec prisma migrate dev
```

When creating a new migration:

```bash
pnpm exec prisma migrate dev --name migration-name
```

### Generate Prisma Client

```bash
pnpm exec prisma generate
```

### Seed the database

```bash
pnpm exec prisma db seed
```

### Open Prisma Studio

```bash
pnpm exec prisma studio
```

Prisma Studio can be used to inspect and edit local database records visually.

## Development Server

Start the application:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Testing

Run tests in watch mode:

```bash
pnpm test
```

Run tests once:

```bash
pnpm test:run
```

The project uses:

- Vitest
- React Testing Library
- jsdom
- jest-dom
- user-event

## Authentication

The project uses Auth.js / NextAuth.js.

Current base setup includes:

- `AUTH_SECRET`
- central `auth.ts`
- Auth.js Route Handler
- Prisma Adapter
- PostgreSQL-backed Auth.js models

Current Auth.js database models:

- User
- Account
- Session
- VerificationToken

OAuth providers will be added in later learning blocks.

## Database Architecture

High-level data flow:

```text
UI / Server Component
        ↓
Data Layer
        ↓
Prisma Client
        ↓
PostgreSQL
```

For mutations:

```text
Form
  ↓
Server Action
  ↓
Zod validation
  ↓
Data Layer / Repository
  ↓
Prisma
  ↓
PostgreSQL
  ↓
revalidatePath / redirect
```

Prisma access should stay on the server and preferably behind the Data Layer / Repository boundary.

## Product Data Layer

The product feature currently supports:

- fetching all products
- fetching a single product
- search
- category filtering
- sorting
- pagination
- create
- update
- delete

## Project Structure

A simplified structure:

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   └── dashboard/
├── components/
│   └── ui/
├── generated/
│   └── prisma/
├── lib/
│   ├── prisma.ts
│   └── products/
│       ├── constants.ts
│       ├── getProduct.ts
│       ├── getProducts.ts
│       ├── pagination.ts
│       ├── productRepository.ts
│       └── types.ts
└── auth.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

## Git Workflow

The repository is also used to practice a work-like Git workflow:

```text
main
  ↓
feat/... or refactor/... branch
  ↓
commits
  ↓
push
  ↓
pull request
  ↓
review
  ↓
merge
  ↓
update local main
  ↓
delete local branch
```

Conventional Commit prefixes used in this project:

```text
feat:
fix:
refactor:
test:
chore:
```

## Learning Roadmap

Current roadmap:

```text
14. PostgreSQL + Prisma + real Data Layer
15. Authentication with Auth.js / NextAuth.js
16. OAuth — Google + GitHub
17. Session + Protected Routes
18. RBAC — USER / ADMIN
19. User Management
20. Route Handlers + own API
21. Caching + Revalidation + use cache
22. Parallel Data Fetching + Waterfall Optimization
23. Advanced Suspense + Streaming Architecture
24. Clean Portfolio Admin Dashboard
25. Component / Integration Testing
26. Mocking + API Testing
27. Playwright E2E
28. Performance + Bundle + Rendering Optimization
29. Security + Authorization Hardening
30. Production Error Handling + Logging
31. Vercel Deployment + Environment Variables
32. Final Architecture Review + Refactor
33. Portfolio Polish + Release
```

## Notes

This is not the final portfolio repository.

The goal is to understand the architecture and tools deeply, practice implementation decisions, and make mistakes safely before rebuilding the final Admin Dashboard from a clean repository.
