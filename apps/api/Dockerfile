# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3-slim

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

RUN pip install poetry

COPY apps/api/pyproject.toml apps/api/poetry.lock ./
RUN poetry install --no-root

COPY apps/api/ .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]