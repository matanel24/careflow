from datetime import date
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from db import get_supabase

router = APIRouter(prefix="/patients", tags=["patients"])


class PatientCreate(BaseModel):
    full_name: str = Field(..., min_length=1)
    id_number: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=1)
    birth_date: date


@router.post("")
def create_patient(patient: PatientCreate):
    try:
        supabase = get_supabase()
        payload = {
            "full_name": patient.full_name.strip(),
            "id_number": patient.id_number.strip(),
            "phone": patient.phone.strip(),
            "birth_date": patient.birth_date.isoformat(),
        }
        response = supabase.table("patients").insert(payload).execute()
        return {"status": "ok", "patient": response.data[0] if response.data else payload}
    except Exception as e:
        error_msg = str(e)
        if "duplicate key" in error_msg.lower() or "23505" in error_msg:
            raise HTTPException(status_code=400, detail="מטופל עם מספר תעודת זהות זה כבר קיים במערכת")
        raise HTTPException(status_code=500, detail=f"שגיאה בשמירת המטופל: {error_msg}")