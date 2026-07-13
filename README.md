# Edemy - Full Stack Web Application

Edemy là một ứng dụng web full-stack được xây dựng bằng Django (Backend) và React (Frontend), có tích hợp GitHub Actions CI/CD pipeline với SonarQube.

## 🏗️ Kiến trúc

```
Edemy/
├── packages/
│   ├── api/          # Django Backend API
│   └── web/          # React Frontend App
├── .github/          # GitHub Actions + CI/CD
└── docs/             # Documentation
```

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd edemy
```

### 2. Setup Backend (Django API)

```bash
cd packages/api

# Install dependencies
pip install -e ".[dev]"

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

API sẽ chạy tại: http://localhost:8000

### 3. Setup Frontend (React)

```bash
cd packages/web

# Install dependencies (using Bun)
bun install

# Start development server
bun run dev
```

Frontend sẽ chạy tại: http://localhost:5173

## 🔄 CI/CD Pipeline

### ⚡ Quick Setup (5 phút)

1. Tạo SonarQube instance (SonarCloud hoặc self-hosted)
2. Add 2 GitHub Secrets:
   - `SONAR_HOST_URL`
   - `SONAR_LOGIN`
3. Push code, xem pipeline chạy!

📖 **Full Guide:** [.github/CI_CD_QUICK_START.md](.github/CI_CD_QUICK_START.md)

### 🔍 Pipeline Overview

Pipeline tự động chạy trên:
- Push tới `develop` hoặc `features/*`
- Pull Request tới `main` hoặc `develop`

**Các bước:**
1. ✅ Code Linting (Ruff)
2. ✅ API Tests (pytest)
3. ✅ Web Tests (Vitest)
4. ✅ E2E Tests (Playwright)
5. ✅ Code Quality (SonarQube)
6. ✅ Deploy (khi tất cả pass)

## 🧪 Testing

### Run Tests Locally

```bash
# API Tests
cd packages/api
pytest --cov=apps --cov-report=html

# Web Tests
cd ../web
bun run coverage

# E2E Tests
bunx playwright test
```

### Run Full CI Pipeline Locally

```bash
bash scripts/local-ci-test.sh
```

## 📊 Code Coverage

- **API**: Target 70%+ coverage
- **Web**: Target 70%+ coverage

Coverage được track tại SonarQube dashboard.

## 🛠️ Development Workflow

### 1. Tạo Feature Branch

```bash
git checkout -b features/your-feature-name
```

### 2. Code & Test

```bash
# Run tests locally
bash scripts/local-ci-test.sh

# Fix issues
```

### 3. Commit & Push

```bash
git add .
git commit -m "feat: your feature description"
git push origin features/your-feature-name
```

### 4. Create Pull Request

- Tạo PR trên GitHub
- Xem pipeline chạy tự động
- Code review & merge

### 5. Deployment

Pipeline tự động deploy khi:
- Tất cả tests pass ✓
- SonarQube quality gate pass ✓
- Merge tới `main` hoặc `develop`

## 📚 Documentation

| Tài liệu | Mục đích |
|----------|----------|
| [.github/README.md](.github/README.md) | CI/CD Overview |
| [.github/CI_CD_QUICK_START.md](.github/CI_CD_QUICK_START.md) | Quick Setup Guide |
| [.github/SONARQUBE_SETUP.md](.github/SONARQUBE_SETUP.md) | SonarQube Configuration |
| [.github/SECRETS_SETUP.md](.github/SECRETS_SETUP.md) | GitHub Secrets Guide |
| [packages/api/README.md](packages/api/README.md) | Backend Documentation |
| [packages/web/README.md](packages/web/README.md) | Frontend Documentation |

## 🔐 Environment Setup

### Backend (.env)

```bash
cd packages/api
cp .env.example .env
# Edit .env with your settings
```

**Required variables:**
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/edemy
```

### Frontend (.env)

```bash
cd packages/web
cp .env.example .env
# Edit .env with your settings
```

**Required variables:**
```
VITE_API_URL=http://localhost:8000
```

## 🐳 Docker Setup (Optional)

### Build & Run with Docker Compose

```bash
# Development
docker-compose up -d

# Production
docker-compose -f compose.prod.yaml up -d
```

Services:
- API: http://localhost:8000
- Web: http://localhost:3000
- PostgreSQL: localhost:5432

## 📋 Project Structure

### Backend (Django)

```
packages/api/
├── apps/
│   ├── accounts/     # User management
│   ├── content/      # Course content
│   └── core/         # Core utilities
├── config/           # Django settings
├── manage.py
└── pyproject.toml
```

### Frontend (React)

```
packages/web/
├── src/
│   ├── components/   # React components
│   ├── features/     # Feature modules
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Page components
│   └── styles/       # Global styles
├── e2e/              # Playwright tests
└── package.json
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Content
- `GET /api/courses/` - List courses
- `GET /api/courses/{id}/` - Course details
- `POST /api/courses/` - Create course (admin)

## 🐛 Common Issues

### Tests failing locally

```bash
# Reinstall dependencies
pip install -e ".[dev]"  # API
bun install             # Web

# Clear cache
rm -rf .pytest_cache    # API
rm -rf node_modules     # Web
```

### CI Pipeline failing

1. Kiểm tra logs tại GitHub Actions
2. Chạy tests locally: `bash scripts/local-ci-test.sh`
3. Fix issues, push lại

### SonarQube connection error

1. Kiểm tra `SONAR_HOST_URL` đúng
2. Kiểm tra `SONAR_LOGIN` token hợp lệ
3. Xem [SONARQUBE_SETUP.md](.github/SONARQUBE_SETUP.md)

## 📊 Tech Stack

### Backend
- **Framework**: Django 6.0+
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Task Queue**: Inngest
- **Testing**: pytest

### Frontend
- **Framework**: React 19+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Testing**: Vitest
- **E2E Testing**: Playwright

### DevOps
- **CI/CD**: GitHub Actions
- **Code Quality**: SonarQube
- **Container**: Docker
- **Orchestration**: Docker Compose

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b features/your-feature`
3. Commit changes: `git commit -am 'feat: add feature'`
4. Push to branch: `git push origin features/your-feature`
5. Submit Pull Request

## 📝 Commit Convention

Dùng Conventional Commits:

```
feat:       A new feature
fix:        A bug fix
docs:       Documentation changes
style:      Code style changes (no logic)
refactor:   Code refactoring
test:       Adding/updating tests
chore:      Build process or dependencies
ci:         CI/CD configuration
```

Example:
```
feat(api): add user authentication endpoint
fix(web): resolve header styling issue
docs: update README with setup instructions
```

## 🚨 Important Notes

### Branches

- `main` - Production branch
- `develop` - Development branch
- `features/*` - Feature branches

### Code Quality

- Minimum coverage: 70%
- Ruff linting must pass
- No security issues
- Quality gate must pass

## 📞 Support

- 📖 Check documentation in `.github/` folder
- 🐛 Report issues on GitHub Issues
- 💬 Discuss in GitHub Discussions

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 👨‍💻 Authors

- Development Team

---

**Get Started:** [.github/CI_CD_QUICK_START.md](.github/CI_CD_QUICK_START.md)
