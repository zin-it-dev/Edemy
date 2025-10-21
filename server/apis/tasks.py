from celery import shared_task
from django.conf import settings
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .agent import generate_outline

@shared_task(bind=True)
def execute_llm(self, args):    
    return generate_outline(args)