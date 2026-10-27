import os
import asyncio
import time
import uuid
from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.responses import StreamingResponse
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Internal modular imports prepared for upcoming logic steps
from src.interceptor import security_audit_payload
from src.router import dynamic_token_route
from src.circuit_breaker import execute_fallback_pipeline
from src.compliance import compliance_engine


load_dotenv()

app = FastAPI(
    title="Llama-Guard Sentinel",
    description="Autonomous Enterprise AI Governance Proxy & Token-Efficient Routing Hub",
    version="1.0.0"
)

# Enforce secure network boundaries using api token headers
API_KEY_NAME = "Authorization"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def verify_proxy_authentication(api_key: str = Depends(api_key_header)):
    """Validates incoming enterprise authorization tokens at the perimeter gateway."""
    expected_token = os.getenv("SENTINEL_PROXY_KEY", "sentinel-local-dev-secret")
    if not api_key or api_key.replace("Bearer ", "") != expected_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing perimeter gateway authorization credentials."
        )
    return api_key

# --- Structured API Data Schema Specifications ---
class ChatMessage(BaseModel):
    role: str = Field(..., description="The role of the message author (system, user, assistant)")
    content: str = Field(..., description="The actual string payload content of the message")

class ChatCompletionRequest(BaseModel):
    model: str = Field("muse-wonder", description="Target model identifier from Meta Model API family")
    messages: List[ChatMessage]
    temperature: Optional[float] = 0.2
    stream: Optional[bool] = False
    max_tokens: Optional[int] = Field(None, description="Hard token generation threshold allocation limit")

@app.on_event("startup")
async def initialize_compliance_daemons():
    """Spins off the asynchronous background worker loop when Uvicorn boots up."""
    asyncio.create_task(compliance_engine.execute_cryptographic_purge_sweep())
    print("[Sentinel Gateway Core] Asynchronous Governance Daemon Threads Spun Up Successfully.")


@app.get("/health", tags=["Infrastructure Maintenance"])
async def systems_health_check():
    """System health check endpoint for tracking local runtime status logs."""
    return {
        "status": "operational",
        "gateway": "Llama-Guard-Sentinel",
        "timestamp": time.time(),
        "compliance_enforcement": "active",
        "active_frameworks": ["EU-AI-Act-Title-III", "ISO-42001", "UNESCO-Art-21"]
    }

@app.post("/v1/chat/completions", tags=["Core Proxy Engine"])
async def proxy_chat_completion(
    request: ChatCompletionRequest,
    authenticated: str = Depends(verify_proxy_authentication)
):
    """
    Main Asynchronous Gateway Ingestion Route.
    Intercepts standard LLM client configurations, runs compliance audits, 
    and handles dynamic routing loops across the Meta Model API ecosystem.
    """
    
    # Extract raw content strings sequentially out of the message array
    user_payload_string = " ".join([msg.content for msg in request.messages if msg.role == "user"])
    
    # 🛑 PHASE 1: Real-time Multi-Category Safety Classification (src/interceptor.py)
    is_safe, safety_report = await security_audit_payload(user_payload_string)
    if not is_safe:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Security Governance Threat Interception Block",
                "policy_violations": safety_report,
                "regulatory_enforcement": "EU AI Act Compliance Engine Intercept"
            }
        )
        
    # 📊 PHASE 2: Capacity Budgeting & Cost Allocation (src/router.py)
    routing_decision = await dynamic_token_route(request.model, user_payload_string)
    
    # 🚢 PHASE 3: Compute Execution Layer & Failure Fallbacks (src/circuit_breaker.py)
    try:
        if request.stream:
            # Generate asynchronous chunk parsing vectors directly to the pipeline client
            generator_stream = await execute_fallback_pipeline(routing_decision, request, stream=True)
            return StreamingResponse(generator_stream, media_type="text/event-stream")
        else:
            static_response = await execute_fallback_pipeline(routing_decision, request, stream=False)
            return static_response

            # 📉 PHASE 4: Register audit trail into the automated governance ledger
            import uuid
            generated_task_id = str(uuid.uuid4())
            await compliance_engine.register_audit_entry(generated_task_id, routing_decision)

            
    except Exception as downstream_infrastructure_error:
        # Gracefully handle unexpected pipeline breaks via standard server failures
        raise HTTPException(
            status_code=502,
            detail={
                "error": "Bad Gateway Cluster Node Response",
                "underlying_cause": str(downstream_infrastructure_error),
                "resolution": "Downstream circuit breaker state triggered automatically."
            }
        )
