import os
import time
import uuid
import asyncio
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.responses import StreamingResponse
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

# Internal architectural component modules
from src.interceptor import security_audit_payload
from src.router import dynamic_token_route
from src.circuit_breaker import execute_fallback_pipeline
from src.compliance import compliance_engine
from telemetry.metrics_exporter import metrics_exporter

app = FastAPI(
    title="Llama-Guard Sentinel",
    description="Autonomous Enterprise AI Governance Proxy & Token-Efficient Routing Hub",
    version="1.0.0"
)

# Enable CORS so your local backend accepts requests from the Lovable app domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows your frontend UI to communicate across origins cleanly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY_NAME = "Authorization"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def verify_proxy_authentication(api_key: str = Depends(api_key_header)):
    expected_token = os.getenv("SENTINEL_PROXY_KEY", "sentinel-local-dev-secret")
    if not api_key or api_key.replace("Bearer ", "") != expected_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing perimeter gateway authorization credentials."
        )
    return api_key

class ChatMessage(BaseModel):
    role: str = Field(..., description="The role of the message author (system, user, assistant)")
    content: str = Field(..., description="The actual string payload content of the message")

class ChatCompletionRequest(BaseModel):
    model: str = Field("meta-models/muse-spark-open-1026", description="Target model identifier")
    messages: List[ChatMessage]
    temperature: Optional[float] = 0.2
    stream: Optional[bool] = False

@app.on_event("startup")
async def initialize_compliance_daemons():
    """Spins off the asynchronous background worker loop when Uvicorn boots up."""
    asyncio.create_task(compliance_engine.execute_cryptographic_purge_sweep())
    print("[Sentinel Gateway Core] Asynchronous Governance Daemon Threads Spun Up Successfully.")

@app.get("/health", tags=["Infrastructure Maintenance"])
async def systems_health_check(authenticated: str = Depends(verify_proxy_authentication)):
    """Exposes gateway health node verification status for secure frontend login checks."""
    return {
        "status": "operational",
        "gateway": "Llama-Guard-Sentinel",
        "timestamp": time.time(),
        "compliance_enforcement": "active"
    }

@app.get("/v1/telemetry/metrics", tags=["Operations Telemetry"])
async def get_gateway_telemetry():
    """Returns machine-parsable, real-time performance analytics snapshots."""
    return metrics_exporter.export_prometheus_snapshot()

@app.post("/v1/chat/completions", tags=["Core Proxy Engine"])
async def proxy_chat_completion(
    request: ChatCompletionRequest,
    authenticated: str = Depends(verify_proxy_authentication),
    x_fireworks_key: Optional[str] = Header(None)  # Dynamic user key passed from the frontend UI
):
    start_time = time.time()
    user_payload_string = " ".join([msg.content for msg in request.messages if msg.role == "user"])
    
    # 🛑 PHASE 1: Safety Classification Intercept using dynamic request credential tokens
    is_safe, safety_report = await security_audit_payload(user_payload_string, x_fireworks_key)
    if not is_safe:
        await metrics_exporter.register_violation()
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Security Governance Threat Interception Block",
                "policy_violations": safety_report,
                "regulatory_enforcement": "EU AI Act Compliance Engine Intercept"
            }
        )
        
    # 📊 PHASE 2: Capacity Budgeting & Cost Allocation
    routing_decision = await dynamic_token_route(request.model, user_payload_string)
    
    # 🚢 PHASE 3: Compute Execution Layer passing dynamic tokens over the wire
    try:
        if request.stream:
            generator_stream = await execute_fallback_pipeline(routing_decision, request, x_fireworks_key, stream=True)
            return StreamingResponse(generator_stream, media_type="text/event-stream")
        else:
            static_response = await execute_fallback_pipeline(routing_decision, request, x_fireworks_key, stream=False)
            
            # 📉 PHASE 4: Register audit trail into the automated governance ledger
            await compliance_engine.register_audit_entry(str(uuid.uuid4()), routing_decision)
            
            # 📈 PHASE 5: Process tracking metrics
            duration_ms = (time.time() - start_time) * 1000
            await metrics_exporter.log_transaction_metrics(routing_decision, duration_ms)
            
            return static_response
            
    except Exception as downstream_infrastructure_error:
        raise HTTPException(
            status_code=502,
            detail={
                "error": "Bad Gateway Cluster Node Response",
                "underlying_cause": str(downstream_infrastructure_error)
            }
        )
