# Edemy 🎓

## What this project does
An AI-first e-learning SaaS (Software as a Service) platform builds artificial intelligence into its core architecture to automate course creation, adapt learning paths in real time, and act as a conversational assistant rather than a static content repository.

## Quick Facts
- **Stack**: Django 6.0 (Django REST Framework), PostgreSQL
- **Package Manager**: uv
- **Run Server**: `uv run python manage.py runserver`
- **Make migrations**: `uv run python manage.py makemigrations`
- **Apply migrations**: `uv run python manage.py migrate`
- **Test Command**: `uv run pytest`
- **Lint Command**: `uv run ruff check . --fix`
- **Format Command**: `uv run ruff format`
- **Type Check**: `uv run pyright`

## Key Directories
- `apps/` - Django applications
- `core/` - Django settings and root URLconf
- `templates/` - Django templates

## Code Style
- Python 3.12+ with type hints required
- No `Any` types - use proper type hints
- Use early returns, avoid nested conditionals
- Prefer Class-Based Views and DRF ViewSets over function-based views.
- **Separation of Concerns**: Keep business logic out of Views and Serializers. Enforce a Service/Selector layer pattern for complex domain logic.

// ViewSet Pattern:
from rest_framework import viewsets, permissions
from apps.courses.models import Course
from apps.courses.serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

## Error Handling & Logging

- Let unexpected database and system errors propagate to Django's global exception handler.
- Always catch and handle expected API exceptions gracefully using DRF's `APIException` subclasses.
- Never expose internal system details, raw SQL, or traceback info in user-facing API responses.

## Security & Secrets Management (OWASP & 12-Factor App)

- **Separation of Config and Code**: Never hardcode sensitive values (like `SECRET_KEY`, database credentials, or API tokens) in the codebase. Always load them from environment variables using a secure parser.
- **SQL Injection Prevention**: Always use the Django ORM safely. Never construct raw SQL queries using string formatting or concatenation. If raw SQL is unavoidable, always use parameterized queries.
- **Input Validation**: Treat all incoming request data as untrusted. Always validate and sanitize input via DRF Serializers before performing any database action.

## Boundaries & Verification System

### ALWAYS
- Run `uv run ruff check . --fix`, `uv run ruff format .`, and `uv run pyright` to verify code correctness before completing any task.
- Generate comprehensive unit and integration tests (using pytest) for any new business logic or api endpoints.
- Ensure all DRF ViewSets/Views have explicit `permission_classes` set.
- This utility class has mixed responsibilities. Split it into focused modules where each module handles one type of functionality: database operations, validation, formatting, etc.
- Use the DRY (Don't Repeat Yourself) principle. If you find yourself writing similar code in multiple places, extract it into a reusable function, method, or component.
- Never expose internal system details, raw SQL, or traceback info in user-facing API responses.
- Always validate and sanitize input via DRF Serializers before performing any database action.
- Always use the Django ORM safely. Never construct raw SQL queries using string formatting or concatenation. If raw SQL is unavoidable, always use parameterized queries.
- Always use TDD (Test Driven Development) principles. Write tests before writing code.

### ASK FIRST
- Before creating or executing any Django migrations. You must propose a written migration schema changes and a rollback strategy first.
- Before installing any new third-party Python library (prefer standard libraries or highly trusted django packages).
- Before modifying settings in `core/settings.py` or base URL configurations.

### NEVER
- Never use historically unsafe functions like `eval()` or `exec()` on user-controlled inputs.
- Never execute dynamic shell commands using `os.system`. Use `subprocess` with `shell=False`.
- Never commit `.env` files, API keys, credentials, or plaintext secrets to Git.
- Never bypass or disable security features (like CSRF protection, CORS headers, or password validators) without explicit written justification.

## Git

Squash merge only.
Conventional commits: feat:, `fix:`, `chore:`, `docs:`.
Branch format: type/short-description (e.g., feat/user-auth) use Gitflow.
Create commit message use command `gitmoji -c`.