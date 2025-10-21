from django.conf import settings
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

from .schemas import CourseOutlineSchema

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", 
    temperature=1,
    top_p=0.95,
    top_k=64,
    max_output_tokens=8192,
    api_key=settings.GOOGLE_API_KEY
)

system_message = """
            You are an expert course content creator. Generate a detailed course outline with modules and lessons based on the user's request.
            The course MUST be comprehensive and cover all necessary aspects of the topic.
            [CONSTRAINTS]
            - Topic: {topic}
            {level}
            {duration}
            {chapter}
            [/CONSTRAINTS]
        """

propmt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            system_message,
        ),
        (
            "human",
            "{topic} {level} {duration} {chapter}",
        ), 
    ]
)

structured_llm_json = llm.with_structured_output(CourseOutlineSchema, method="json_mode")


async def generate_outline(data):   
    topic = data.get("topic")
    
    duration = (
        f"- Duration: The course should be designed for approximately {data.get("duration")}."
        if data.get("duration")
        else ""
    )
    level = f"- Level: The target audience level is {data.get("level")}." if data.get("level") else ""
    chapter = (
        f"- Modules: The course must be split into exactly {data.get('chapters')} modules."
        if data.get("chapters")
        else ""
    )

    template = {
        "topic": topic,
        "duration": duration,
        "chapter": chapter,
        "level": level,
    }

    chain = propmt | structured_llm_json
    
    response = await chain.ainvoke(template)
    result = response.model_dump(exclude_none=True)
    
    return result