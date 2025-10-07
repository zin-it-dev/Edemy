from celery import shared_task

from .processes import AIProcessor


@shared_task
def execute_ai_agent(course_id, data):
    result = AIProcessor().generator_outline(data['topic'], data['level'], data['duration_weeks'])
    print(result)
    return {'course_id': course_id, 'result': result}