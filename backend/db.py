"""Shared Supabase connection for all backend routes.

The URL and key come from the .env file (never from the code), so secrets stay out of Git.
"""
import os

from dotenv import load_dotenv
from fastapi import HTTPException
from supabase import Client, create_client

load_dotenv()

_client: Client | None = None


def get_supabase() -> Client:
    """Return one shared Supabase client, created on first use."""
    global _client
    if _client is None:
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")
        if not url or not key:
            raise HTTPException(
                status_code=503,
                detail="Database is not configured: add SUPABASE_URL and SUPABASE_KEY to .env",
            )
        _client = create_client(url, key)
    return _client
