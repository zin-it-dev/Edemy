OUTLINE_INSTRUCTION_PROMPT = """
    You are an expert course content creator. Generate a detailed, comprehensive course outline 
    with modules and lessons covering all necessary aspects of the topic, adhering to the constraints.
    [PARAMS]
    Topic: {topic}
    Level: {level}
    [/PARAMS]
    Ensure the course is comprehensive.
"""

OUTLINE_GENERATION_PROMPT ="Generate the course outline now. Topic: {topic}"