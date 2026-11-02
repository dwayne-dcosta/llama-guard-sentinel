import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Shield,
  ArrowRight,
  Code,
  KeyRound,
  CheckCircle2,
  Lock,
  Cpu,
  Server,
  Database,
  Layers,
  Globe,
  Download,
  AlertTriangle,
  FileText,
  Activity,
  Zap,
  Check,
  Copy,
  Sliders,
  Radio,
  ExternalLink,
} from 'lucide-react';

export const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('byom');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Copy helper for code snippets
  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 1500);
    } catch (err) {
      console.error('Failed to copy snippet:', err);
    }
  };

  // Scroll spy tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['byom', 're-entrant-defense', 'governance-matrix', 'eu-ai-act', 'dpdp-act', 'hipaa-pii', 'api-reference'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const curlRecipeCode = `curl -X POST "http://localhost:8000/v1/chat/completions" \\
  -H "Authorization: Bearer sentinel-local-dev-secret" \\
  -H "X-Fireworks-Key: b10_prod_9934acb8e1f04128a8d11" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "meta-models/muse-spark-open-1026",
    "temperature": 0.2,
    "max_tokens": 512,
    "messages": [
      {
        "role": "user",
        "content": "Analyze the token classification telemetry and report anomalies in cluster node 4."
      }
    ]
  }'`;

  const headersSignatureCode = `POST /v1/chat/completions HTTP/1.1
Host: localhost:8000
Authorization: Bearer sentinel-local-dev-secret
X-Fireworks-Key: b10_prod_9934acb8e1f04128a8d11
Content-Type: application/json
Accept: application/json
Origin: https://sentinel-enclave.internal
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site`;

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-mono cyber-grid relative selection:bg-cyan-500 selection:text-black">
      {/* Top Banner Header */}
      <section className="border-b border-cyan-500/20 bg-[#0B0F19]/80 backdrop-blur-md pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300 font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06B6D4]" />
            <span>SENTINEL COMPLIANCE & SECURITY MATRIX · V2.4.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Developer Documentation & System Matrix
          </h1>

          <p className="text-slate-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            Exhaustive technical reference for decentralized Bring Your Own Model (BYOM) architectures, reverse perimeter tunnel hardening, cryptographic token attestation, and global regulatory compliance mapping (EU AI Act, DPDP, HIPAA).
          </p>
        </div>
      </section>

      {/* Main 2-Column Split: Left Sticky Index Nav + Right Broad Canvas */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT STICKY INDEX NAVIGATION BAR (lg:col-span-3)
            ========================================================================= */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6">
          <div className="bg-[#0B0F19]/90 border border-cyan-500/25 p-5 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>INDEX DIRECTORY</span>
              </span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                LIVE
              </span>
            </div>

            <nav className="space-y-1 text-xs">
              <a
                href="#byom"
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'byom'
                    ? 'bg-cyan-950/90 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-3.5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                1. Architectural Core (BYOM)
              </a>

              <a
                href="#re-entrant-defense"
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 're-entrant-defense'
                    ? 'bg-cyan-950/90 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-3.5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                2. Perimeter Defense & Tunnels
              </a>

              <a
                href="#governance-matrix"
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'governance-matrix'
                    ? 'bg-cyan-950/90 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-3.5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                3. Governance & Compliance
              </a>

              <div className="pl-4 space-y-1 pt-0.5">
                <a
                  href="#eu-ai-act"
                  className={`block px-2.5 py-1.5 rounded text-[11px] transition-colors ${
                    activeSection === 'eu-ai-act'
                      ? 'text-cyan-400 font-semibold bg-cyan-950/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  › EU AI Act Compliance
                </a>
                <a
                  href="#dpdp-act"
                  className={`block px-2.5 py-1.5 rounded text-[11px] transition-colors ${
                    activeSection === 'dpdp-act'
                      ? 'text-teal-400 font-semibold bg-teal-950/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  › DPDP Act Sandbox
                </a>
                <a
                  href="#hipaa-pii"
                  className={`block px-2.5 py-1.5 rounded text-[11px] transition-colors ${
                    activeSection === 'hipaa-pii'
                      ? 'text-cyan-400 font-semibold bg-cyan-950/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  › HIPAA & PII Quarantine
                </a>
              </div>

              <a
                href="#api-reference"
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'api-reference'
                    ? 'bg-cyan-950/90 text-cyan-300 font-bold border-l-2 border-cyan-400 pl-3.5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                4. API Specs & Ingestion Conduit
              </a>
            </nav>
          </div>

          {/* Quick Launch Panel */}
          <div className="p-5 rounded-2xl bg-[#070D1F] border border-cyan-500/20 text-xs space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.05)]">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[11px]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Operator Cockpit</span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
              Dispatch live inference packets over active reverse tunnel bridges and inspect real-time rolling telemetry.
            </p>
            <Link
              to="/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold uppercase tracking-wider text-black bg-[#14B8A6] hover:bg-[#2dd4bf] transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] text-xs cursor-pointer"
            >
              <span>Launch Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT BROAD SCROLLABLE TEXT CANVAS (lg:col-span-9)
            ========================================================================= */}
        <main className="lg:col-span-9 space-y-16">
          {/* =======================================================================
              PILLAR 1: THE ARCHITECTURAL CORE: BRING YOUR OWN MODEL (BYOM)
              ======================================================================= */}
          <section id="byom" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-cyan-500/30">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                  1. The Architectural Core: Bring Your Own Model (BYOM)
                </h2>
                <span className="text-xs text-cyan-400 font-normal">
                  Decoupled Control Plane · Sovereign Data Plane · Zero Vendor Lock-in
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <p>
                The fundamental operational premise of Sentinel Edge Portal is a radical architectural decoupling: <strong className="text-white font-mono">the strict separation of the control plane from the data plane</strong>. Traditional hosted AI proxy services act as intermediaries that intercept, log, and process enterprise token streams on proprietary cloud servers. Sentinel eliminates this attack vector entirely.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/30 space-y-2">
                  <div className="text-cyan-300 font-bold uppercase flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>Control Plane (Client Enclave)</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    Operates inside the operator browser memory space. Enforces local key attestation, heuristic regex guardrails, and cryptographic token verification. No private keys or prompt payloads are synchronized to external cloud databases.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F19] border border-teal-500/30 space-y-2">
                  <div className="text-teal-300 font-bold uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-teal-400" />
                    <span>Data Plane (Sovereign Compute)</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    Resides strictly on the enterprise target infrastructure. Supports local Apple Silicon unified memory nodes, Dockerized private FastAPI servers, or dedicated Baseten H100 inference clusters over private reverse tunnels.
                  </p>
                </div>
              </div>

              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider pt-2">
                Single Connection String Re-Targeting
              </h3>
              <p>
                Organizations retain total sovereign ownership over their inference pipelines. Operators can instantly redirect telemetry ingestion across different environments by inputting a single base URL connection string (e.g., <code className="text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded font-mono">http://localhost:8000</code> or a dynamic Pinggy HTTPS reverse tunnel) <strong className="text-white">without changing or recompiling a single line of application source code</strong>.
              </p>

              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider pt-2">
                OpenAI-Compatible Chat Completion Conduits
              </h3>
              <p>
                Sentinel ingests requests conforming to standard REST specifications on <code className="text-cyan-400 font-mono">/v1/chat/completions</code>. The architecture natively accommodates:
              </p>
              <ul className="list-disc list-inside space-y-1.5 font-mono text-xs pl-2 text-slate-300">
                <li>
                  <strong className="text-cyan-300">Primary Model Identifier:</strong>{' '}
                  <code className="text-cyan-400 bg-black px-1.5 py-0.5 rounded border border-slate-800">meta-models/muse-spark-open-1026</code>{' '}
                  — High-throughput open-weights parameter set engineered for rapid classification and sub-millisecond guardrail heuristics.
                </li>
                <li>
                  <strong className="text-teal-300">Local Edge Fallback:</strong>{' '}
                  <code className="text-teal-400 bg-black px-1.5 py-0.5 rounded border border-slate-800">llama-3-8b-instruct-local</code>{' '}
                  — On-premise offline fallback running on local MPS / Metal or CUDA runtimes when internet backhauls are severed.
                </li>
              </ul>
            </div>
          </section>

          {/* =======================================================================
              PILLAR 2: RE-ENTRANT PERIMETER DEFENSE HARDENING
              ======================================================================= */}
          <section id="re-entrant-defense" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-cyan-500/30">
              <div className="p-2 rounded-xl bg-teal-950/80 border border-teal-500/40 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                  2. Re-Entrant Perimeter Defense Hardening
                </h2>
                <span className="text-xs text-teal-400 font-normal">
                  Reverse Tunnel Bridge Shielding · Cryptographic Dual-Header Attestation · Strict CORS Isolation
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <p>
                Hosting private LLM models inside internal developer machines (e.g. MacBook Pro clusters or intranet racks) traditionally required opening insecure incoming ports or configuring complex VPC peering. Sentinel pairs with high-speed reverse tunnel brokers (e.g., <strong className="text-white">Pinggy, Cloudflare Tunnels, or WireGuard conduits</strong>) to project an outbound TLS socket bridge.
              </p>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/30 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                  <span className="text-cyan-400 font-bold uppercase">Outbox Header Encryption Signature</span>
                  <button
                    onClick={() => handleCopyCode(headersSignatureCode, 'headers')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {copiedSnippet === 'headers' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Signature</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                  {headersSignatureCode}
                </pre>
              </div>

              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider pt-2">
                Dual Cryptographic Attestation Tokens
              </h3>
              <p>
                Every outbound dispatch is signed with dual authorization invariants verified at the perimeter firewall:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#070D1F] border border-cyan-500/20 space-y-1.5">
                  <span className="text-cyan-400 font-bold">1. Authorization: Bearer Token</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Injected dynamically from the operator's active guardrail state (<code className="text-cyan-300">sentinel-local-dev-secret</code> or provisioned <code className="text-cyan-300">snt_gw_live_••••••••</code>). Authorizes passage through the local tunnel bridge.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070D1F] border border-teal-500/20 space-y-1.5">
                  <span className="text-teal-400 font-bold">2. X-Fireworks-Key: Remote Cluster Key</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Transmits the verified Personal Baseten API Access Key (<code className="text-teal-300">b10_prod_••••••••</code>) in encrypted transit to authenticate upstream GPU worker nodes without exposing credentials in request URIs.
                  </p>
                </div>
              </div>

              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider pt-2">
                Strict CORS Network Policy
              </h3>
              <p>
                Browser fetch invocations enforce strict Cross-Origin Resource Sharing parameters (<code className="text-cyan-300 font-mono">mode: 'cors'</code>, <code className="text-cyan-300 font-mono">credentials: 'omit'</code>) to prevent credential reflection attacks, session hijacking, or cross-site request forgery across multi-tenant browser windows.
              </p>
            </div>
          </section>

          {/* =======================================================================
              PILLAR 3: RIGOROUS GOVERNANCE & COMPLIANCE FRAMEWORKS MATRIX
              ======================================================================= */}
          <section id="governance-matrix" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-cyan-500/30">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                  3. Rigorous Governance & Compliance Frameworks Matrix
                </h2>
                <span className="text-xs text-cyan-400 font-normal">
                  EU AI Act · DPDP Act · HIPAA Enclave Standards · Append-Only Audit Ledger
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Sentinel Edge Gate operates as an enterprise compliance firewall. By inspecting and classifying tokens before they reach the model weights, organizations achieve zero-trust compliance mapping across leading global regulatory standards:
            </p>

            {/* Comprehensive Structured Compliance Matrix Table */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#070D1F] shadow-[0_0_30px_rgba(6,182,212,0.06)]">
              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#0B1329] text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 text-cyan-400">Framework Baseline</th>
                      <th className="py-3 px-4">Mandate / Article</th>
                      <th className="py-3 px-4">Sentinel Architectural Control</th>
                      <th className="py-3 px-4">Enforcement Engine</th>
                      <th className="py-3 px-4 text-right">Verification Artifact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-[11px]">
                    {/* Row 1: EU AI Act */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">EU AI Act (2024)</td>
                      <td className="py-3 px-4 text-cyan-300">Articles 9, 14, 15 (High-Risk AI Systems)</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">
                        Adversarial injection interception, jailbreak defense, automated risk management logging
                      </td>
                      <td className="py-3 px-4 text-rose-400 font-bold">Rule 403 Vector Filter</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-mono">threatLogs JSON Ledger</td>
                    </tr>

                    {/* Row 2: DPDP Act */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">DPDP Act (India)</td>
                      <td className="py-3 px-4 text-teal-300">Sections 4 & 8 (Data Fiduciary Safeguards)</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">
                        Hermetic client-side storage perimeter; zero server-side credential persistence
                      </td>
                      <td className="py-3 px-4 text-teal-400 font-bold">Multi-Tenant Sandbox</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-mono">localStorage Boundary</td>
                    </tr>

                    {/* Row 3: HIPAA Security Rule */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">HIPAA Security Rule</td>
                      <td className="py-3 px-4 text-cyan-300">45 CFR § 164.312 (Technical Safeguards)</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">
                        Real-time PII & ePHI scrubbing (SSNs, medical record IDs, credentials) prior to transit
                      </td>
                      <td className="py-3 px-4 text-amber-400 font-bold">Entropy Heuristic Interceptor</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-mono">Pre-Ingestion Quarantine</td>
                    </tr>

                    {/* Row 4: SOC 2 Type II */}
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">SOC 2 Type II</td>
                      <td className="py-3 px-4 text-teal-300">CC6.1 - CC6.8 (Logical Access & Audit)</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">
                        Role-based access control (Operator, Auditor, Admin) with dual-key cryptographic validation
                      </td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">RBAC Enclave Gate</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-mono">Session Tracking Matrix</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subsection 3.1: EU AI Act Deep Dive */}
            <div id="eu-ai-act" className="scroll-mt-32 p-6 rounded-2xl bg-[#0B0F19] border border-cyan-500/20 space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 font-mono text-cyan-300 font-bold uppercase text-xs">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>3.1 EU AI Act Compliance: Algorithmic Safety & Append-Only Ledgers</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Under Articles 9, 14, and 15 of the European Union Artificial Intelligence Act, deployers of foundation models must implement continuous risk management systems that prohibit toxic adversarial manipulation. Sentinel enforces:
              </p>
              <ul className="list-disc list-inside space-y-1.5 font-mono text-xs pl-2 text-slate-400">
                <li><strong className="text-slate-200">Adversarial Jailbreak Neutralization:</strong> Immediate pattern matching against DAN (Do Anything Now) vectors, recursive prompt overrides, and system constraint leaks.</li>
                <li><strong className="text-slate-200">Deterministic Temperature Overrides:</strong> Adversarial test macros automatically collapse model sampling temperature to <code className="text-cyan-400">0.0</code> for reproducible audit evaluations.</li>
                <li><strong className="text-slate-200">Append-Only Audit Ledger:</strong> Every threat interception generates an immutable log entry with severity and heuristic categorization, downloadable via the "EXPORT AUDIT LEDGER" engine as timestamped JSON blobs.</li>
              </ul>
            </div>

            {/* Subsection 3.2: DPDP Act Deep Dive */}
            <div id="dpdp-act" className="scroll-mt-32 p-6 rounded-2xl bg-[#0B0F19] border border-teal-500/20 space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 font-mono text-teal-300 font-bold uppercase text-xs">
                <Database className="w-4 h-4 text-teal-400" />
                <span>3.2 DPDP Act Compliance: Client-Side Storage Perimeter Isolation</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                India's Digital Personal Data Protection (DPDP) Act establishes strict liabilities for un-siloed data transmission. Sentinel solves this through our <strong className="text-white">Multi-Tenant Sandbox architecture</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1.5 font-mono text-xs pl-2 text-slate-400">
                <li><strong className="text-slate-200">Hermetic Native Storage:</strong> User account directories (<code className="text-teal-300">auth_users_directory</code>), active session matrices (<code className="text-teal-300">auth_session_tracking_matrix</code>), and edge guardrail tokens (<code className="text-teal-300">auth_edge_guardrails</code>) are stored exclusively in the operator's browser <code className="text-teal-300">localStorage</code>.</li>
                <li><strong className="text-slate-200">Zero Cloud Database Leakage:</strong> Credentials are never dispatched to central servers, eliminating cross-tenant data contamination and cloud database breaches.</li>
                <li><strong className="text-slate-200">Instant Cryptographic Revocation:</strong> Revoking an operator's guardrails zeroes out tokens in local storage, immediately locking the cockpit.</li>
              </ul>
            </div>

            {/* Subsection 3.3: HIPAA & PII Deep Dive */}
            <div id="hipaa-pii" className="scroll-mt-32 p-6 rounded-2xl bg-[#0B0F19] border border-cyan-500/20 space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 font-mono text-cyan-300 font-bold uppercase text-xs">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>3.3 HIPAA & PII Enclave Protection: Sub-Millisecond String Heuristics</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                To satisfy HIPAA 45 CFR § 164.312 specifications, Sentinel runs high-speed vector heuristics on all outbound payload chunks. Detected sensitive entities are quarantined prior to socket ingestion:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
                <div className="p-3 rounded-xl bg-black border border-slate-800 space-y-1">
                  <span className="text-rose-400 font-bold">PII Social Security Masking</span>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Regex pattern parsing catches 9-digit SSNs and replaces tokens with quarantine hashes.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold">Secret Key Exfiltration Shield</span>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Entropy analysis flags token sequences matching cloud API key patterns (Baseten, OpenAI, AWS).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold">Corporate Metadata Scrubbing</span>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Internal cluster hostnames and perimeter ledger logs are stripped from outbound payloads.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================================
              PILLAR 4: REST API SPECIFICATION & OPERATIONAL RECIPE
              ======================================================================= */}
          <section id="api-reference" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-cyan-500/30">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                  4. REST API Specification & Operational Recipe
                </h2>
                <span className="text-xs text-cyan-400 font-normal">
                  Standardized OpenAI-Format Chat Completions Conduit
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <p>
                To interact with Sentinel programmatically from external automated CI/CD runners, terminal shells, or autonomous agents, execute an HTTP POST request targeting the bridge endpoint:
              </p>

              {/* cURL Operational Recipe Code Card */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/30 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                  <span className="text-cyan-400 font-bold uppercase">Terminal Ingestion Command (cURL)</span>
                  <button
                    onClick={() => handleCopyCode(curlRecipeCode, 'curl')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {copiedSnippet === 'curl' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy cURL Command</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                  {curlRecipeCode}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-[#070D1F] border border-slate-800 space-y-2 font-mono text-xs">
                <span className="text-white font-bold">Standard JSON Response Specification:</span>
                <pre className="text-slate-400 text-[11px] overflow-x-auto">
{`{
  "id": "chatcmpl-9f8a2bc9004d81",
  "object": "chat.completion",
  "created": 1730419200,
  "model": "meta-models/muse-spark-open-1026",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "[SENTINEL_EDGE_VERIFIED]: Telemetry node analysis completed on meta-models/muse-spark-open-1026. All 4 worker clusters operating within nominal parameters."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 38,
    "completion_tokens": 42,
    "total_tokens": 80
  },
  "sentinel_enclave_metadata": {
    "gateway_token_verified": true,
    "baseten_key_verified": true,
    "latency_ms": 18,
    "threat_status": "CLEARED"
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Footer Action Navigation */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <Link
              to="/"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← Return to Sovereign Overview
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-black bg-[#14B8A6] hover:bg-[#2dd4bf] transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] cursor-pointer"
            >
              <span>Launch Live Operator Cockpit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};
