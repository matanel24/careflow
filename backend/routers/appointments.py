from fastapi import APIRouter, HTTPException
from db import get_supabase

router = APIRouter(prefix="/appointments", tags=["appointments"])

@router.get("")
def get_appointments():
    try:
        supabase = get_supabase()
        response = (
            supabase.table("appointments")
            .select("*")
            .order("appointment_time", desc=False)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))