import logging, inngest

logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

inngest_client = inngest.Inngest(app_id="edemy", logger=logger)
