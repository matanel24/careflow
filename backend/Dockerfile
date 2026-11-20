# Base image: a small Linux with Python 3.12 already installed
FROM python:3.12-slim

# All following commands run inside /app in the container
WORKDIR /app

# Copy only the dependency list first, so Docker can cache the install step
COPY requirements.txt .

# Install the Python libraries (fastapi, uvicorn, supabase, python-dotenv)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code into the container
COPY . .

# Document that the server listens on port 8000
EXPOSE 8000

# Start the FastAPI server; --reload restarts it when code changes (development only)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
