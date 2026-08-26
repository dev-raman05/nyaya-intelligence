import os

class Settings:
    GEMINI_API_KEY: str | None = os.environ.get("GEMINI_API_KEY")
    CORPUS_PATH: str = os.environ.get("CORPUS_PATH", "../data")
    EMBEDDING_MODEL: str = os.environ.get("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    HOST: str = os.environ.get("HOST", "0.0.0.0")
    PORT: int = int(os.environ.get("PORT", "7860"))
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

settings = Settings()
