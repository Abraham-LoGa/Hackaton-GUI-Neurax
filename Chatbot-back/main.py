from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router

app = FastAPI(title="Hotel Agent API")

# Habilitar CORS para el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción, cambia esto por el dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Integrar las rutas de api.py
app.include_router(router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)