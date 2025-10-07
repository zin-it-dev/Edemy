from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from django.conf import settings

from .schemas import CourseOutlineSchema, LessonContentSchema
from .utils import detect_output_language

class AIProcessor:
    def __init__(self, model_name: str = "gemini-2.5-flash"):
        self.llm = ChatGoogleGenerativeAI(
            model=model_name, 
            google_api_key=settings.GOOGLE_API_KEY
        )

    def generator_outline(self, topic: str, level: str, duration: int) -> dict:        
        structured_llm = self.llm.with_structured_output(CourseOutlineSchema, method="json")
        
        language = detect_output_language(topic) 
        
        prompt = PromptTemplate(
            template="""
            You are an expert course designer. Your task is to create a comprehensive course outline.
            Based on the following information:
            - Topic: {topic}
            - Level: {level}
            - Duration: {duration} weeks

            Generate the Course Name, Description, and a list of Modules. 
            Each Module must contain 3 to 5 Lessons.
            
            **IMPORTANT:** The entire output (Course Name, Description, Module Names, and Lesson Titles)
            MUST be written entirely in **{language}**. **DO NOT generate the Lesson Content.**
            """,
            input_variables=["topic", "level", "duration"],
            partial_variables={
                "language": language
            },
        )
        
        chain = prompt | structured_llm
        result = chain.invoke({
            "topic": topic,
            "level": level,
            "duration": duration
        })
        
        return result.model_dump()

    def generate_lesson_content(self, course_name: str, lesson_title: str, course_description: str, level: str) -> str:
        structured_llm = self.llm.with_structured_output(LessonContentSchema, method="json")

        prompt = PromptTemplate(
            template="""
            You are an expert educator. Your task is to write the complete, detailed, and high-quality content for **ONE** lesson, based on the following course context:

            ### CONTEXT:
            - Course Name: {course_name}
            - Course Description: {course_description}
            - Course Level: {level}
            - Lesson Title to Generate: **{lesson_title}**

            ---

            ### REQUIREMENTS:
            1. Write the content entirely in **Markdown format**.
            2. The content must be detailed, comprehensive, and appropriate for the **{level}** level.
            3. Ensure the tone and depth are suitable for the overall course goals.
            4. Respond **ONLY** with the lesson content; do not include any introductory remarks, explanations, or extraneous text.
            """,
            input_variables=["course_name", "course_description", "level", "lesson_title"]
        )
        
        chain = prompt | structured_llm
        
        result = chain.invoke({
            "course_name": course_name,
            "course_description": course_description,
            "level": level,
            "lesson_title": lesson_title
        })
        
        return result.content