from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import appointments
from routers import ai_requests

app = FastAPI(title="CareFlow API")
app.include_router(appointments.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(ai_requests.router)
