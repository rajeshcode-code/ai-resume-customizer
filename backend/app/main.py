from fastapi import FastAPI, UploadFile, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .parsers import parse_pdf, parse_docx
from .services import customize_resume_with_llm
from .config import settings

app = FastAPI(title="Resume Customizer API")

origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/customize")
async def customize_resume(
    file: UploadFile,
    jd: str = Form(...)
):
    if len(jd.strip()) < 50:
        raise HTTPException(status_code=400, detail="Job description is too short.")
        
    ext = file.filename.split(".")[-1].lower()
    contents = await file.read()
    
    if ext == "pdf":
        resume_text = parse_pdf(contents)
    elif ext in ["doc", "docx"]:
        resume_text = parse_docx(contents)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF or DOCX.")
        
    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from the document.")

    try:
        result = await customize_resume_with_llm(resume_text, jd)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Processing Error: {str(e)}")