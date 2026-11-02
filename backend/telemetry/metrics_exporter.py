import time
from typing import Dict, Any

class MetricsExporter:
    def __init__(self):
        # Operational core metrics tracking matrices
        self.total_requests_parsed = 0
        self.blocks_intercepted = 0
        self.total_financial_expenditures = 0.0
        self.rolling_latency_ms = 0.0

    async def log_transaction_metrics(self, routing_decision: Dict[str, Any], duration_ms: float):
        """ Dynamically tracks transaction volume and processes running latency markers. """
        self.total_requests_parsed += 1
        
        # Calculate dynamic latency weights
        if self.rolling_latency_ms == 0.0:
            self.rolling_latency_ms = duration_ms
        else:
            self.rolling_latency_ms = (self.rolling_latency_ms * 0.7) + (duration_ms * 0.3)
            
        # Parse token tracking costs
        estimated_cost = routing_decision.get("estimated_cost", 0.00015)
        self.total_financial_expenditures += estimated_cost

    async def register_violation(self):
        """ Increment threat count metrics when an active security drop occurs. """
        self.blocks_intercepted += 1

    def export_prometheus_snapshot(self) -> Dict[str, Any]:
        """ Packs active analytics counters into a structured JSON payload response. """
        return {
            "status": "synchronized",
            "total_requests_parsed": self.total_requests_parsed,
            "blocks_intercepted": self.blocks_intercepted,
            "total_financial_expenditures": round(self.total_financial_expenditures, 5),
            "rolling_latency_ms": round(self.rolling_latency_ms, 2),
            "timestamp": time.time()
        }

# Global singleton component initialization referenced inside src/main.py
metrics_exporter = MetricsExporter()
