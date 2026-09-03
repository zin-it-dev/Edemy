import inngest
import logging
from django.conf import settings

logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

# Initialize the Inngest client for Django
inngest_client = inngest.Inngest(app_id="edemy_django", logger=logger)
