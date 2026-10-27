# Stage 1: Build virtual environment dependencies
FROM python:3.10-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN python -m venv /opt/guard_env
ENV PATH="/opt/guard_env/bin:$PATH"

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Final lightweight runtime layer
FROM python:3.10-slim AS runner

WORKDIR /app

# Ingest sandboxed dependency layers from the builder image stage
COPY --from=builder /opt/guard_env /opt/guard_env
ENV PATH="/opt/guard_env/bin:$PATH"

# Copy core system architectures securely into the image context
COPY config/ /app/config/
COPY src/ /app/src/
COPY telemetry/ /app/telemetry/

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

# Expose production ASGI Uvicorn execution runtime configurations
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
