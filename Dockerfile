# syntax = docker/dockerfile:1

FROM python:3.12.8-slim AS final

# Create virtual environment in the correct location
RUN python -m venv /opt/venv

# Install Python dependencies
COPY backend/requirements.txt .
RUN /opt/venv/bin/pip install -r requirements.txt

# Copy backend application code
COPY backend/ /app/backend

# Copy .env file
COPY .env .

WORKDIR /app/backend
EXPOSE 8080
CMD ["/opt/venv/bin/flask", "run", "--host=0.0.0.0", "--port=8080"]