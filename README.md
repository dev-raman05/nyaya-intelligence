# Nyaya Intelligence ⚖️

Nyaya Intelligence is a high-fidelity, interactive legal research prototype for Indian jurisprudence. It features a complete AI-assisted pipeline using a React/Next.js frontend and a Python/FastAPI backend powered by hybrid vector search and Reciprocal Rank Fusion (RRF).

## Features
- **Smart Legal Research**: Uses BM25 (Lexical) + FAISS (Semantic) retrieval on a custom legal corpus.
- **Authority Map**: Interactive 2D citation graph to visualize how cases cite, follow, distinguish, or overrule each other.
- **Citation Checker**: AI-powered analysis to verify the health and status of legal citations.
- **Argument Builder**: Constructs legal arguments with supporting and challenging precedents.
- **PDF Export**: Print-ready, properly paginated PDF generation of your research.

## Project Structure
```
nyaya-intelligence/
├── frontend/               # Next.js, React, Tailwind CSS UI
│   ├── src/app/            # Next.js 14 App Router pages
│   ├── src/components/     # Modular React components
│   └── src/lib/            # Centralized API client & state context
├── backend/                # FastAPI Python Server
│   ├── app/routers/        # API endpoints (research, citations, etc.)
│   ├── app/retrieval/      # BM25 & FAISS search engines
│   ├── app/services/       # Reranking, corpus loading, LLM calls
│   └── app/graph/          # NetworkX citation graph builder
└── data/                   # The offline JSON legal corpus (Cases, Paragraphs, Citations)
```

## Local Development Setup

### 1. Backend (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (Windows):
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. (Optional) Set your Gemini API Key in `backend/.env` for AI features:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
5. Start the server (runs on port 8000):
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   *(Note: The first boot takes ~10 seconds to build the FAISS index locally)*

### 2. Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on port 3000):
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Render 🚀

This repository includes a `render.yaml` Blueprint file for automatic, one-click deployment on [Render](https://render.com/).

### Steps:
1. Push this repository to your GitHub account.
2. Log in to [Render dashboard](https://dashboard.render.com).
3. Click **New > Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect the `render.yaml` file and provision two Web Services:
   - `nyaya-backend` (Python/FastAPI)
   - `nyaya-frontend` (Node/Next.js)
6. Add your `GEMINI_API_KEY` to the Environment Variables of the `nyaya-backend` service in the Render dashboard.

*(The `render.yaml` automatically wires the `NEXT_PUBLIC_API_URL` in the frontend to point to the backend's live URL).*

## Documentation
All major files across the `frontend` and `backend` directories have been extensively commented to explain the architecture, state management, and retrieval logic.
