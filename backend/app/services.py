import google.generativeai as genai
import json
from .config import settings
from .prompts import SYSTEM_PROMPT
from .schemas import CustomizationResponse

# Configure the API key from your .env file
genai.configure(api_key=settings.GEMINI_API_KEY)

# Using the active gemini-2.5-flash model
model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=SYSTEM_PROMPT)

async def customize_resume_with_llm(resume_text: str, jd_text: str) -> CustomizationResponse:
    prompt = f"JOB DESCRIPTION:\n{jd_text}\n\nCANDIDATE RESUME:\n{resume_text}\n\nReturn the output in the strictly requested JSON schema."
    
    # Request the output in strict JSON format
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
        )
    )
    
    try:
        # Parse the JSON string returned by Gemini into our Python schema
        data = json.loads(response.text)
        return CustomizationResponse(**data)
    except Exception as e:
        raise ValueError(f"Failed to parse LLM response: {str(e)}")