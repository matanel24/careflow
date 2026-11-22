"""Clinic AI assistant – save a question to the ai_requests table.

Stage C end-to-end check: start screen -> POST /ai-requests -> Supabase.
No real AI model yet; the answer column stays empty for now.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from db import get_supabase

router = APIRouter(prefix="/ai-requests", tags=["AI assistant"])


class AIQuestion(BaseModel):
    question: str = Field(min_length=1, max_length=1000)


@router.post("", status_code=201)
def create_ai_request(body: AIQuestion):
    """Save a new question and return the saved row."""
    question = body.question.strip()
    if not question:
        raise HTTPException(status_code=422, detail="Question cannot be empty")
    result = get_supabase().table("ai_requests").insert({"question": question}).execute()
    return result.data[0]


@router.get("")
def list_ai_requests(limit: int = 10):
    """Return the latest questions, newest first."""
    result = (
        get_supabase()
        .table("ai_requests")
        .select("*")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return result.data
