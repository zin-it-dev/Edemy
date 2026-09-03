# Edemy 🎓

An AI-first e-learning SaaS (Software as a Service) platform builds artificial intelligence into its core architecture to automate course creation, adapt learning paths in real time, and act as a conversational assistant rather than a static content repository.

## Stack

- Next.js 16 App Router, React 19, TypeScript 5.4 strict mode
- Tailwind CSS + shadcn/ui
- Bun
- Vitest for tests
- Zod is the safe choice for TypeScript validation. It has the largest ecosystem, most tutorials, and integrates with everything. React Hook Form and Zod works with all of them.


## Commands

Dev server: `bun run dev`
Build: `bun run build`
Test: `bun test`
Lint: `bun run lint --fix`
Typecheck: `bun x tsc --noEmit`
Deploy: `bun run deploy:staging`

## Code Style

- Functional components only. Never class components.
- Use `const` exclusively. Never `var`, never `let` unless reassignment is needed.
- Named exports only for components. Never default exports.
- Use camelCase for variables, PascalCase for components, and kebab-case for filenames.
- High Cohesion & Modularity: Element files must have a single, focused purpose. Keep functions pure, small, and decomposable. Avoid `junk drawer` files.

// Component pattern:
export const UserCard = ({ name, email }: UserCardProps) => {
  return <div className="p-4">{name}</div>;
};

## Error Handling

Let errors propagate. Do not wrap individual calls in try/catch.
The global error handler in `app/global-error.tsx` catches everything.
Never expose internal system details, stack traces, or secrets in user-facing error messages.

## Security & Data Integrity

- **Input Validation**: Treat all external/user input as untrusted. Always validate and sanitize inputs using robust schemas (e.g., Zod) before processing.
- **Output Encoding**: Use parameterized queries for all database operations. Escape and encode special characters before rendering HTML to prevent XSS/SQL Injection.
- **Constant-Time Comparison**: Always use constant-time comparison when verifying sensitive data like tokens, session IDs, password hashes, or API keys to avoid timing attacks.

## Architecture

/src
    /app         -> Routes and page components
    /components  -> Shared UI components
    /lib         -> Business logic and utilities

Never import from `/app` into `/lib`. Data flows one direction.


## Boundaries

### ALWAYS
- Run `bun run lint --fix`, `bun run build`, and `bun x tsc --noEmit` to verify code correctness before completing any task.
- Generate comprehensive Vitest unit tests (including negative test cases to ensure safe failure states) for any new business logic.
- Ensure all configurations follow least-privilege principles and secure defaults (e.g., HTTPS, secure cookies).
- Always use TDD (Test Driven Development) principles. Write tests before writing code.

### ASK FIRST
- Before installing any new third-party dependency (never use obscure packages; prefer Bun's built-in APIs or community-trusted libraries to avoid slopsquatting/hallucinated dependencies).
- Before making any database schema migrations (propose a written schema migration plan with rollback steps first).
- Before modifying public API endpoints or core shared utility functions.

### NEVER
- Never modify files in `/generated/`.
- Never commit `.env` files, API keys, credentials, or plaintext secrets. Use secure environment variables.
- Never use the `any` type in TypeScript.
- Never write placeholder code or unresolved `TODO` comments without flagging them for security review.
- The `/legacy/` module uses sync patterns. Do not convert to async.


## Git

Squash merge only.
Conventional commits: feat:, `fix:`, `chore:`, `docs:`.
Branch format: type/short-description (e.g., feat/user-auth) use Gitflow.
Create commit message use command `gitmoji -c`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->