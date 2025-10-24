from django.conf import settings
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from typing import Dict, Any, Optional

from .schemas import OutlineSchema
from .prompts import OUTLINE_INSTRUCTION_PROMPT, OUTLINE_GENERATION_PROMPT


class AgentProcessor:
    def __init__(self, schema, system_message, human_message):
        self.llm_model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.6,
            top_p=0.9,
            top_k=64,
            max_output_tokens=1024,
            api_key=settings.GOOGLE_API_KEY,
            request_timeout=30,
        )
        self.prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    system_message,
                ),
                (
                    "human",
                    human_message,
                ),
            ]
        )
        self.chain = self.prompt | self.llm_model.with_structured_output(
            schema, method="json_mode"
        )

    async def _prepare_template_data(
        self, data: Dict[str, Any]
    ) -> Dict[str, Optional[str]]:
        topic = data.get("topic")
        level = data.get("level")

        return {
            "topic": topic,
            "level": level,
        }

    async def execute_generate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        template = await self._prepare_template_data(data)
        response = await self.chain.ainvoke(template)
        return response.model_dump(exclude_none=True)


agent_outline = AgentProcessor(
    schema=OutlineSchema,
    system_message=OUTLINE_INSTRUCTION_PROMPT,
    human_message=OUTLINE_GENERATION_PROMPT,
)