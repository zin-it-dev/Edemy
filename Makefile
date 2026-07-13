.PHONY: help up stop down migrate makemigrations shell test logs populate

help:
	@echo "Available commands:"
	@echo "  make up              - Start all services"
	@echo "  make watch           - Debug all services"
	@echo "  make stop            - Stop all services"
	@echo "  make down            - Stop and remove all services (with volumes)"
	@echo "  make migrate         - Run database migrations"
	@echo "  make makemigrations  - Create new database migrations"
	@echo "  make populate        - Populate fixture data"
	@echo "  make shell           - Open Django shell"
	@echo "  make test            - Run tests"
	@echo "  make logs            - View live container logs"

up:
	docker compose up -d --build

watch:
	docker compose watch

stop:
	docker compose stop

down:
	docker compose down -v

migrate:
	docker compose exec api python manage.py migrate

makemigrations:
	docker compose exec api python manage.py makemigrations

shell:
	docker compose exec api python manage.py shell

populate:
	docker compose exec api python manage.py populate

test:
	docker compose exec api python manage.py test

logs:
	docker compose logs -f api web