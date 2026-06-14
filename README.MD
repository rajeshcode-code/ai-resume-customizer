# 🚀 AI-Powered Resume Customizer

An intelligent Full-Stack Web Application that analyzes a Job Description (JD) and a candidate's resume, utilizing Google's Gemini LLM to automatically tailor the resume for maximum ATS compatibility.

**Live Demo:** [View Application Here](https://ai-resume-customizer-five.vercel.app)

---

## 📖 Project Overview

Job seekers often struggle to manually customize their resumes for every application. This tool automates the process by extracting text from uploaded resumes (PDF/DOCX) and using advanced prompt engineering to rewrite summaries, align skills, and reorder experience bullets to perfectly match the target role. 

### ✨ Key Features
* **Smart Resume Parsing:** Extracts content directly from PDF and DOCX files without saving them to a disk.
* **Dual Customization Engine:** Generates both a "Conservative" (factual/safe) and "Aggressive" (highly ATS-optimized) version of the resume.
* **Match & ATS Scoring:** Predicts how well the tailored resume will perform against Applicant Tracking Systems.
* **Cover Letter Generation:** Automatically drafts a professional cover letter based on the synthesized data.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 15 (App Router)
* **Library:** React
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Hosting:** Vercel

### Backend
* **Framework:** FastAPI (Python)
* **Parsing:** `pdfplumber`, `python-docx`
* **Data Validation:** Pydantic
* **Hosting:** Render

### Artificial Intelligence
* **LLM Provider:** Google Gemini API (`gemini-2.5-flash`)
* **Integration:** Direct SDK with strict JSON schema enforcement.

---

## 📐 Architecture

1. **Client Layer:** Next.js captures the JD text and Resume file, streaming them as `multipart/form-data` to the backend.
2. **Processing Layer:** FastAPI intercepts the file in memory (`io.BytesIO`) and extracts raw text using format-specific parsers.
3. **AI Layer:** The backend constructs a strict system prompt containing the extraction and JD, requesting structured JSON output from Gemini.
4. **Validation Layer:** Pydantic strictly validates the LLM's JSON payload before returning it to the client.
5. **Presentation Layer:** The React frontend parses the structured data into an interactive, downloadable dashboard.

---

## 🚀 Local Setup Instructions

### Prerequisites
* Node.js (v20+)
* Python (v3.11+)
* Google Gemini API Key

### 1. Backend Setup
Navigate to the backend directory and set up the Python environment:
```bash
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt