import os
import json
from typing import Dict, Any

def load_sentinel_policy() -> Dict[str, Any]:
    """Helper framework to read governance configurations from the immutable JSON file."""
    config_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "config", "sentinel_policy.json")
    try:
        with open(config_path, "r") as file:
            return json.load(file)
    except Exception:
        # Secure fallback fallback settings in case of configuration corruption
        return {
            "workload_routing": {
                "local_edge_token_threshold": 150,
                "local_edge_fallback_model": "llama-3-8b-instruct-local",
                "cloud_frontier_default_model": "muse-wonder",
                "cost_estimation_multiplier": 0.00015
            }
        }

async def dynamic_token_route(target_model: str, user_payload: str) -> Dict[str, Any]:
    """
    Asynchronously tracks incoming workload metrics and makes algorithmic 
    routing decisions driven directly by the centralized sentinel_policy settings.
    """
    policy = load_sentinel_policy()
    routing_rules = policy.get("workload_routing", {})
    
    threshold = routing_rules.get("local_edge_token_threshold", 150)
    multiplier = routing_rules.get("cost_estimation_multiplier", 0.00015)
    local_model = routing_rules.get("local_edge_fallback_model", "llama-3-8b-instruct-local")
    cloud_model = routing_rules.get("cloud_frontier_default_model", "muse-wonder")

    estimated_tokens = len(user_payload) // 4
    print(f"[Sentinel Router Trace] Evaluating payload: Estimated {estimated_tokens} tokens against threshold {threshold}.")

    if estimated_tokens <= threshold:
        routing_decision = {
            "execution_vector": "LOCAL_EDGE_NODE",
            "model_target": local_model,
            "estimated_token_cost": 0.0,
            "routing_reason": f"Payload footprint sits below the {threshold} token threshold configuration limit."
        }
    else:
        routing_decision = {
            "execution_vector": "CLOUD_FRONTIER_CLUSTER",
            "model_target": target_model if target_model else cloud_model,
            "estimated_token_cost": estimated_tokens * multiplier,
            "routing_reason": "High-complexity workload matched. Delegating to distributed cloud infrastructure layers."
        }
        
    return routing_decision
