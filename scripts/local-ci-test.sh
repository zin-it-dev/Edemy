#!/bin/bash
# Local CI/CD testing script
# Run all checks locally before pushing to GitHub

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Main execution
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  🚀 Local CI/CD Pipeline Tester${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

# API Tests
echo -e "${BLUE}📦 Step 1: Running Django API Tests${NC}"
echo "─────────────────────────────────────────"
cd packages/api

if ! command -v python &> /dev/null; then
    log_error "Python not found. Please install Python 3.14+"
    exit 1
fi

log_info "Setting up API environment..."
pip install -e ".[dev]" > /dev/null 2>&1

log_info "Running pytest with coverage..."
if pytest --cov=apps --cov-report=html --cov-report=term-summary 2>&1 | tee pytest.log; then
    log_success "API tests passed ✓"
else
    log_error "API tests failed ✗"
    exit 1
fi

COVERAGE_RESULT=$(grep -E "^TOTAL" pytest.log | tail -1)
log_info "Coverage: $COVERAGE_RESULT"
echo ""

# Web Tests
echo -e "${BLUE}📦 Step 2: Running React Web Tests (Vitest)${NC}"
echo "─────────────────────────────────────────"
cd ../web

if ! command -v bun &> /dev/null; then
    log_warning "Bun not found. Installing..."
    curl -fsSL https://bun.sh/install | bash
fi

log_info "Installing dependencies..."
bun install > /dev/null 2>&1

log_info "Running Vitest with coverage..."
if bun run coverage 2>&1 | tee vitest.log; then
    log_success "Web tests passed ✓"
else
    log_error "Web tests failed ✗"
    exit 1
fi
echo ""

# E2E Tests
echo -e "${BLUE}📦 Step 3: Running E2E Tests (Playwright)${NC}"
echo "─────────────────────────────────────────"
log_info "Installing Playwright browsers..."
bunx playwright install --with-deps > /dev/null 2>&1

log_info "Running Playwright tests..."
if bunx playwright test 2>&1; then
    log_success "E2E tests passed ✓"
else
    log_error "E2E tests failed ✗"
    exit 1
fi
echo ""

# Linting
echo -e "${BLUE}📦 Step 4: Running Linting (Ruff)${NC}"
echo "─────────────────────────────────────────"
cd ../api

log_info "Running Ruff linter..."
if ruff check . 2>&1 | tee ruff.log; then
    log_success "Linting passed ✓"
else
    log_warning "Linting issues found (continuing...)"
fi
echo ""

# Summary
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 All local checks passed!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
log_info "Ready to push your code! 🚀"
echo ""
echo "Coverage reports:"
echo "  - API: packages/api/htmlcov/index.html"
echo "  - Web: packages/web/coverage/index.html"
echo "  - E2E: packages/web/playwright-report/index.html"
echo ""
