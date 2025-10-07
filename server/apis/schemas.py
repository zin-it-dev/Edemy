from pydantic import BaseModel, Field
from typing import List


class CommonSchema(BaseModel):
    name: str = Field(description="The name or title of the item.")


class BaseSchema(CommonSchema):
    order: int = Field(description="The sequential order number.")


class LessonSchema(BaseSchema):
    title: str = Field(description="The concise title for the lesson.")


class ModuleSchema(BaseSchema):
    lessons: List[LessonSchema] = Field(description="A list of lessons belonging to this module.")


class CourseOutlineSchema(CommonSchema):
    description: str = Field(description="A brief summary of what the course covers.")
    modules: List[ModuleSchema] = Field(description="A list of course modules, each containing lessons.")


class LessonContentSchema(BaseModel):
    content: str = Field(description="The detailed, comprehensive content for the lesson. Can be left empty in the initial outline.")