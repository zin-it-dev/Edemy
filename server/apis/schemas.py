from pydantic import BaseModel, Field
from typing import List


class CommonSchema(BaseModel):
    title: str = Field(description="The name or title of the item.")


class LessonSchema(CommonSchema):
    content: str = Field(description="The detailed, comprehensive content for the lesson. Can be left empty in the initial outline.")


class OutlineSchema(CommonSchema):
    description: str = Field(description="A brief summary of what the course covers.")
    modules: List[CommonSchema] = Field(description="A list of course modules, each containing lessons.")