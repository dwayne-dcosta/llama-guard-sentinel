import os
import json
from typing import Dict, Any, AsyncGenerator, Optional
from openai import AsyncOpenAI

async def execute_fallback_pipeline(
    routing_decision: Dict[str, Any], 
    request_payload: Any, 
    dynamic_api_key: Optional[str] = None,
    stream: bool = False
) -> Any:
    """ Executes real-time inference streaming using the required hackathon model footprint. """
    # Enforce the absolute mandatory model parameter string provided by the organizers
    target_model = "meta-models/muse-spark-open-1026"

    if not dynamic_api_key or dynamic_api_key == "mock-dev-key":
        if stream:
            async def dev_stream_simulator():
                yield "data: {\"choices\": [{\"delta\": {\"role\": \"assistant\", \"content\": \"[Sandbox Execution Mode Active - Provide valid Fireworks Key to stream live weights]\\n\"}}]}\n\n"
                yield "data: [DONE]\n\n"
            return dev_stream_simulator()
        else:
            return {
                "id": "chatcmpl-sentinel-sandbox",
                "object": "chat.completion",
                "model": target_model,
                "choices": [{"index": 0, "message": {"role": "assistant", "content": "Sandbox active. Enter your personal Fireworks API key into the console header to stream live open weights over the wire."}, "finish_reason": "stop"}],
                "usage": {"prompt_tokens": 10, "completion_tokens": 15, "total_tokens": 25},
                "governance_routing_metadata": routing_decision
            }

    # Initialize live connection targeting Fireworks serverless nodes using the user's key
    client = AsyncOpenAI(
        base_url="https://fireworks.ai",
        api_key=dynamic_api_key
    )

    formatted_messages = [{"role": msg.role, "content": msg.content} for msg in request_payload.messages]

    if stream:
        async def live_response_generator() -> AsyncGenerator[str, None]:
            response_stream = await client.chat.completions.create(
                model=target_model,
                messages=formatted_messages,
                temperature=0.2,
                stream=True
            )
            async for chunk in response_stream:
                yield f"data: {json.dumps(chunk.model_dump())}\n\n"
            yield "data: [DONE]\n\n"
        return live_response_generator()
    else:
        raw_completion = await client.chat.completions.create(
            model=target_model,
            messages=formatted_messages,
            temperature=0.2,
            stream=False
        )
        response_dict = raw_completion.model_dump()
        response_dict["governance_routing_metadata"] = routing_decision
        return response_dict
