# Get Stared

## Useful Commands

Bring containers up and build. Add -d flag to run output detached from current shell.

```bash
docker-compose up --build -d
```

Bring containers down. Add -v flag to also delete named volumes

```bash
docker-compose down -v
```

Create superuser

```bash
python manage.py createsuperuser
# or
docker-compose exec web python manage.py createsuperuser
```

Unittest

```bash
pytest
```

```bash
npm run test
# or
npm run e2e:ci
```

Coverage reports

```bash
pytest --cov --cov-report xml
```

```bash
npm run coverage
```

E2E testing

```bash
npm run e2e
```

Show report testing

```bash
npm run e2e:report
```

Fixtures data seed

```bash
docker-compose exec web python manage.py seed
```

Elasticsearch

```bash
docker-compose exec web python manage.py search_index --rebuild
```