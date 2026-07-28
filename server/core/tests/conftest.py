import pytest

# import psycopg2
# import random
# from django.db import connections, connection
# from django.test import Client
# from django.core.management import call_command
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


# # @pytest.fixture(scope='session')
# # def django_db_setup(django_db_setup, django_db_blocker):
# #     with django_db_blocker.unblock():
# #         call_command('loaddata', 'my_fixture.json')


# def run_sql(sql):
#     with psycopg2.connect(database='postgres') as conn:
#         conn.execute(sql)


# @pytest.fixture(scope='session')
# def django_db_setup(django_db_blocker):
#     with django_db_blocker.unblock():
#         with connection.cursor() as cur:
#             cur.executescript('ALTER SEQUENCE app_model_id_seq RESTART WITH %s;',
#                         [random.randint(10000, 20000)])

#     from django.conf import settings

#     settings.DATABASES['default']['NAME'] = 'the_copied_db'

#     run_sql('DROP DATABASE IF EXISTS the_copied_db')
#     run_sql('CREATE DATABASE the_copied_db TEMPLATE the_source_db')

#     yield

#     for connection in connections.all():
#         connection.close()

#     run_sql('DROP DATABASE the_copied_db')


# @pytest.fixture
# def admin_user(
#     db: None,
#     django_user_model: _User,
#     django_username_field: str,
# ) -> _User:
#     """A Django admin user.

#     This uses an existing user with username "admin", or creates a new one with
#     password "password".
#     """
#     UserModel = django_user_model
#     username_field = django_username_field
#     username = "admin@example.com" if username_field == "email" else "admin"

#     try:
#         user = UserModel._default_manager.get_by_natural_key(username)
#     except UserModel.DoesNotExist:
#         user_data = {}
#         if "email" in UserModel.REQUIRED_FIELDS:
#             user_data["email"] = "admin@example.com"
#         user_data["password"] = "password"
#         user_data[username_field] = username
#         user = UserModel._default_manager.create_superuser(**user_data)
#     return user


# @pytest.fixture
# def admin_client(
#     db: None,
#     admin_user: _User,
# ) -> Client:
#     """A Django test client logged in as an admin user."""
#     client = Client()
#     client.force_login(admin_user)
#     return client


# @pytest.fixture
# def db_access_without_rollback_and_truncate(request, django_db_setup, django_db_blocker):
#     django_db_blocker.unblock()
#     yield
#     django_db_blocker.restore()
