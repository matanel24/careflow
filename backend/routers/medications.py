from fastapi import APIRouter, HTTPException
from db import get_supabase

router = APIRouter(prefix="/medications", tags=["medications"])


@router.get("")
def get_medications():
    """Returns the medication inventory, sorted by name."""
    supabase = get_supabase()  # raises 503 if .env is missing
    try:
        response = (
            supabase.table("medications")
            .select("id, name, dosage, stock_quantity, min_stock")
            .order("name", desc=False)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
