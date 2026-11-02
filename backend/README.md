# Llama-Guard Sentinel 🛡️
### *Autonomous Enterprise AI Governance Proxy & Token-Efficient Hybrid Edge Routing Gateway*

Llama-Guard Sentinel is a containerized network perimeter gateway proxy engineered to intercept enterprise large language model workloads. It enforces real-time content safety alignment under the EU AI Act (Title III High-Risk Systemic Threat Intercepts) and the UNESCO Artificial Intelligence Governance Guidelines (Art. 21) using localized and serverless inference layers.

## 🏛️ Architectural Overview
- **Phase 1: Real-time Multi-Category Safety Classification** via Llama-Guard-3 weights.
- **Phase 2: Capacity Budgeting & Cost Allocation** mapping localized token footprint matrices.
- **Phase 3: High-Performance Compute Delivery & Circuit Breakers** targeting `meta-models/muse-spark-open-1026`.
- **Phase 4: Cryptographic Governance Auditing** running asynchronous background zero-fill storage purge sweeps.

## 🚀 Infrastructure Sandbox Quickstart

### 📦 Prerequisites
- Docker / Docker Desktop Engine
- Python 3.10+ (Local verification tracking)

### 🐋 Deployment Vector (Docker Compose)
1. Initialize your local environmental configuration profile:
   ```bash
   touch .env
   ```
2. Populate the `.env` matrix with your core gateway routing tokens:
   ```env
   SENTINEL_PROXY_KEY=sentinel-local-dev-secret
   META_MODEL_API_BASE_URL=https://fireworks.ai
   HACKATHON_MODEL_ID=meta-models/muse-spark-open-1026
   ```
3. Compile and boot the containerized sandbox network mesh:
   ```bash
   docker compose up --build
   ```

### 🏎️ Automated Bot-Compatibility Harness Test
Verify perimeter drops and endpoint data handshakes via the simulated test client utility:
```bash
source guard_env/bin/activate
python test_gateway.py
```
