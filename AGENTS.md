# Edemy

AI-first e-learning SaaS platform. Three-service architecture: Next.js frontend, Django REST backend, Expo mobile app. Clerk for auth, Inngest for background jobs, PostgreSQL for data.

## Monorepo Layout

```
/client   → Next.js 16 (App Router), React 19, Bun, Clerk auth
/server   → Django 6.1, DRF, Python 3.14, uv, PostgreSQL
/mobile   → Expo SDK 57, React Native 0.86
```

Each sub-project has its own `AGENTS.md` with detailed conventions — read the relevant one before editing code there.

## Infrastructure

- **Docker Compose** (`compose.yaml`) orchestrates all services
- **Inngest dev server** runs on ports 8288/8289, connects to Django at `http://server:8000/api/inngest`
- **Clerk** handles auth end-to-end: frontend uses `@clerk/nextjs`, backend uses `clerk-backend-api` for JWT verification and webhook sync
- Server secrets stored in `server/deploy/SECRET` (auto-generated if missing)

## Commands (Root Level)

All commands run through Docker Compose via `make`:

```bash
make up              # Start all services
make down            # Stop all services
make watch           # Watch + hot reload (compose watch)
make build           # Rebuild all images
make lint            # Lint backend (ruff) + frontend (eslint)
make test            # Run server pytest
make test-e2e        # Run Playwright E2E tests
make migrate         # Apply Django migrations
make makemigrations  # Generate new migrations
make shell           # Django shell
make logs            # View server logs
```

## Commands (Per Service)

**Client** (`/client`):
```bash
bun run dev          # Dev server
bun run build        # Production build
bun test             # Vitest
bun run lint --fix   # ESLint
bun x tsc --noEmit   # Typecheck
```

**Server** (`/server`):
```bash
uv run python manage.py runserver
uv run pytest
uv run ruff check . --fix
uv run ruff format
uv run pyright
```

**Mobile** (`/mobile`):
```bash
npx expo start
npx expo lint
npx tsc --noEmit
```

## Server Architecture

- **Django apps**: `accounts`, `courses` (in `server/apps/`)
- **Settings split**: `core/settings/base.py`, `local.py`, `testing.py`, `production.py`
- **Testing**: SQLite in-memory, migrations disabled (`--nomigrations`, `--reuse-db`), coverage of `apps/`, MD5 password hasher. Settings module is `core.settings.testing` (set in `pytest.ini`)
- **Service/Selector pattern**: Business logic in `services.py`/`selectors.py`, not in views or serializers
- **Shared code**: `server/libs/mixins/` holds cross-app model/permission/serializer mixins (e.g. `TimestampMixin`, `IsActiveMixin`, `SlugMixin`)
- **Inngest**: client defined in `core/client.py` (`inngest_client`); background functions (`server/apps/*/tasks.py`) registered via `inngest.django.serve()` in `apps/urls.py`. Inngest handler logic is split into pure `_handle_*` functions so it's unit-testable without the SDK
- **API versioning**: URL-path based (`/v1/`, `/v2/`), default v1
- **Auth flow**: Clerk JWT verified via `accounts.auth.ClerkAuthentication`, user synced to DB via Inngest on `clerk/user.*` events
- **Gotcha**: `apps/urls.py` imports `clerk_webhook` from `accounts.webhooks`, but that file is not yet present — importing the URLconf currently breaks. Don't assume it exists.

## Client Architecture

- **Route groups**: `(auth)` for sign-in/sign-up, `(dashboard)` for protected routes
- **Providers**: Clerk → React Query → ThemeProvider (composed in `src/providers/index.tsx`)
- **Auth guard**: Dashboard layout checks `auth()` and redirects to `/sign-in` if unauthenticated
- **Component library**: shadcn/ui components in `src/components/ui/`
- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`)
- **Path aliases**: `@/*` maps to `./src/*`
- **Build output**: `output: "standalone"` in `next.config.ts`; client container uses `network_mode: "host"` in `compose.yaml`

## Verification Order

Always run in this order before completing a task:

**Client**: `bun run lint --fix` → `bun x tsc --noEmit` → `bun run build`
**Server**: `uv run ruff check . --fix` → `uv run ruff format` → `uv run pyright` → `uv run pytest`

## Key Conventions

- **Git**: Squash merge only. Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`). Branch format: `type/short-description`. Create commits with `gitmoji -c`.
- **Server Python**: 3.14+, type hints required, no `Any` types, prefer CBVs and DRF ViewSets, early returns over nesting
- **Client TypeScript**: Functional components only, named exports only, `const` over `let`/`var`, Zod for validation
- **Expo**: Never create `ios/` or `android/` dirs by hand. Use `npx expo install` not npm/bun for packages.
- **Migrations**: Always propose written schema changes and rollback strategy before executing
- **Dependencies**: Ask before installing new third-party packages (prefer built-in APIs)

## Sub-project Detail Files

- `client/AGENTS.md` — Client code style, error handling, security rules, Next.js 16 specifics
- `server/AGENTS.md` — Server code style, DRF patterns, security, migration policy
- `mobile/AGENTS.md` — Expo conventions, EAS build, native generation rules
