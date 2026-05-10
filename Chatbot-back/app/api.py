from fastapi import APIRouter, HTTPException
from app.schemas import ChatRequest, AgentResponse
from app.agent import procesar_prompt_con_gemini

router = APIRouter()

@router.post("/chat", response_model=AgentResponse)
async def chat_con_agente(request: ChatRequest):
    try:
        # EL SECRETO ESTÁ AQUÍ: Necesitas el "await" para resolver la corrutina
        resultado = await procesar_prompt_con_gemini(request.prompt)
        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))