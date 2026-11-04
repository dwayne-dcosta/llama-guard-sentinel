## 🛡️ Llama Guard Sentinel

Llama Guard Sentinel is an enterprise-grade AI Governance Gateway and Perimeter Security Ingress Proxy designed to intercept, audit, and secure Large Language Model (LLM) inference streams. Built around a high-performance **FastAPI asynchronous engine** and a **React/TypeScript monitoring cockpit**, the architecture provides deterministic mitigation against prompt injection, toxic payloads, and unsafe content vectors before malicious inputs can penetrate core computing nodes.

****

## 🗺️ Architectural Process Mapping

The framework employs a multi-tier, decoupled pipeline architecture across local containerized topologies and remote serverless hardware cluster runtimes.
```txt
                  [ PUBLIC INGRESS ADVERSARIAL PAYLOAD ]
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │     Tier 1: Frontend Monitoring Cockpit (React Edge)     │
       └─────────────────────────────────────────────────────────┘
                                    │
                         (HTTPS JSON Payload Stream)
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │     Tier 2: Asynchronous Security Ingress Proxy         │
       │             (FastAPI / Python Uvicorn Server)           │
       └─────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     Phase 1: Pre-Processing   │               │     Phase 3: Core Compute     │
│       Perimeter Audit Gate    │               │       Execution Layer         │
│  (Fireworks AI / Llama Guard) │               │      (Baseten Cluster)        │
└───────────────────────────────┘               └───────────────────────────────┘
            │                                               ▲
    [ PASS SECURITY FILTERS ]                               │
            └───────────────────────────────────────────────┘
```

**1. Ingress Validation & Pre-Processing Security Gate (`interceptor.py`)**
* **Trigger:** The client posts an execution signature through the gateway workspace.
* **Intercept:** The payload hits the input sanitation engine where structural proxy checks extract the user context matrix.
* **Audit:** The proxy marshals the query and streams it natively via an `AsyncOpenAI` client directly to the **Fireworks AI high-throughput endpoint** using the **Llama-Guard security model**.
* **Verdict:**
  * If flagged malicious, a secure authorization block triggers an immediate exit, logging threat telemetry data.
  * If verified clean, the payload advances down the transit pipeline to the text-generation framework.
  
**2. Core Operational Compute & Execution Layer (`circuit_breaker.py`)**
* **Forwarding:** Clean prompt packages are dispatched to the primary token generation engine.
* **Primary Cluster Routing:** The engine establishes an asynchronous connection handshake over the **Baseten Serverless Hardware Infrastructure** using active .env token pools.
* **Circuit Breaker Protocol:** Runtime thresholds (latency, timeouts, connection degradation) are evaluated continually. If a cluster node anomalies threshold is breached, the execution system intercepts the failure, blocks backend locking, and switches routes to backup failover fallback configurations instantly.

****

## 🛠️ Project Structure

```txt
llama-guard-sentinel/
├── backend/                             # Asynchronous Python Engine Tier
│   ├── config/                          # Telemetry configurations
│   ├── src/
│   │   ├── main.py                      # Master Proxy Router Entry Point
│   │   ├── interceptor.py               # Phase 1: Pre-Processing Llama-Guard Audit
│   │   ├── circuit_breaker.py           # Phase 3: Baseten Inference & Failover Logic
│   │   └── router.py                    # Network Mapping Rules
│   ├── telemetry/                       # Auditing & Telemetry Data Stores
│   ├── Dockerfile                       # Python Container Environment Blueprint
│   ├── docker-compose.yml               # Backend Microservice Orchestrator
│   └── requirements.txt                 # Pinned Dependencies
├── frontend/                            # React Developer Interface Tier
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.tsx            # Live Metrics Performance Cockpit
│   │   └── ...
```

****

## 🚀 Rapid Deployment Deployment Guide

## 🐳 Running via Container Package (GitHub Container Registry)

To pull and execute the compiled production-ready backend image layer directly from our public registry, pass the following sequence:

```bash
# 1. Pull the container package from GHCR
docker pull ghcr.io/dwayne-dcosta/llama-guard-sentinel-backend:v1.0.0

# 2. Run the secure runtime container
docker run -p 8000:8000 --env-file ./backend/.env ghcr.io/dwayne-dcosta/llama-guard-sentinel-backend:v1.0.0
```

****

## 🔨 Running via Source Code Workspace (Docker Compose)

To compile the multi-tier monorepo components inside an isolated network sandbox natively from the source repository:

```bash
# 1. Clone the production workspace tree
git clone -b main https://github.com/dwayne-dcosta/llama-guard-sentinel.git
cd llama-guard-sentinel

# 2. Navigate to the orchestration directory
cd backend

# 3. Provision environment parameters (.env file configuration required)
# Ensure META_MODEL_API_KEY and FIREWORKS_API_KEY match live tokens.

# 4. Compile and launch the unified gateway network stack
docker compose up --build
```

****

## 🌐 Production Node Enclaves
* **Global Operator Console Frontend (Edge Hosted):** `llama-guard-sentinel.vercel.app`
* **Local Ingress Proxy Node (Dockerized Backend):** `http://localhost:8000`
  
****

## 🔒 Security & Compliance
* All credentials, private workspace nodes, and operational tokens are dynamically injected via environment arrays (`.env`) locked down behind global `.gitignore` patterns.
* System operations maintain strict CORS separation, isolating client visualization states completely from server compute domains.