import os
import json
from google import genai
from google.genai import types
from app.database import buscar_en_db
from app.schemas import AgentResponse
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()
client = genai.Client()

async def procesar_prompt_con_gemini(prompt_usuario: str) -> dict:
    instruccion_sistema = """Eres un agente experto en reservaciones. Analiza el requerimiento del usuario, deduce amenidades y vibra (ej. pet friendly, romántico, tranquilo), y utiliza la herramienta de búsqueda para encontrar opciones."""

    # FASE 1: MODO HERRAMIENTAS
    config_herramientas = types.GenerateContentConfig(
        system_instruction=instruccion_sistema,
        tools=[buscar_en_db],
        temperature=0.0 
    )

    # AQUÍ ESTÁ LA MAGIA NUEVA (sin GenerativeModel)
    chat = client.aio.chats.create(
        model="gemini-2.5-flash",
        config=config_herramientas
    )
    
    # El modelo recibe el prompt y usa la herramienta
    await chat.send_message(prompt_usuario)
    
    # FASE 2: MODO ESTRUCTURADO (JSON)
    config_json = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=AgentResponse,
        temperature=0.0
    )

    # Forzamos la salida estructurada
    respuesta_final = await chat.send_message(
        "Basado en los hoteles que acabas de encontrar en la base de datos, genera tu respuesta final cumpliendo estrictamente con el esquema JSON solicitado.",
        config=config_json
    )
    
    return json.loads(respuesta_final.text)