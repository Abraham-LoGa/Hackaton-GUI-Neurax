from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    prompt: str

class Hotel(BaseModel):
    id_hotel: int
    nombre: str
    precio_noche_mxn: float
    ubicacion: str
    rate_calificacion: int
    img: str
    amenidades: List[str]
    vibra_estilo: List[str]
    descripcion: str
    pet_friendly: bool
    romantico: bool
    apto_ninos: bool
    tipo_alojamiento: str


class AgentResponse(BaseModel):
    respuesta_natural: str
    hoteles_recomendados: List[Hotel]