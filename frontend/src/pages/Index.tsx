import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  ShieldAlert,
  ArrowRight,
  Cpu,
  Lock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Database,
  Terminal,
  Zap,
} from 'lucide-react';

export const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative bg-[#000000] text-slate-100 overflow-hidden min-h-screen cyber-grid">
      {/* Ambient Cyber Space Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#06B6D4]/15 via-[#0B0F19]/40 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#14B8A6]/10 blur-[140px] pointer-events-none -z-10" />

      {/* HERO BANNERS MATRIX */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top Enclave Signal */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0B0F19] border border-cyan-500/30 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4] animate-pulse" />
            <span className="text-cyan-400 font-semibold tracking-wider uppercase">SENTINEL PERIMETER MATRIX</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 tracking-wide">SECURE ENCLAVE ACTIVE</span>
          </div>

          {/* Mandatory Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-mono">
            Sovereign guardrails for every token your models emit.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Enterprise perimeter firewall governing LLM inference pipelines with sub-millisecond latency. Enforce multi-tenant client boundaries, automated PII scrubbing, and cryptographic attestation.
          </p>

          {/* Action Buttons with Mandatory Neon Teal Button */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm font-mono font-bold tracking-wider uppercase text-black bg-[#14B8A6] hover:bg-[#2dd4bf] shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Access Console Hub →</span>
            </Link>

            <Link
              to="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-mono font-medium tracking-wider uppercase text-slate-200 bg-[#0B0F19] border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] whitespace-nowrap cursor-pointer"
            >
              <span>System Documentation</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>

          {/* Live Telemetry Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-[#0B0F19]/80 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.06)] text-left font-mono">
            <div className="border-r border-slate-800/80 pr-4">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Gateway Latency</div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-0.5 text-cyan-400">
                0.28<span className="text-xs text-slate-400 font-normal">ms</span>
              </div>
            </div>
            <div className="border-r border-slate-800/80 pr-4">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Sandbox Enclave</div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-0.5 text-teal-400">
                Hermetic
              </div>
            </div>
            <div className="border-r border-slate-800/80 pr-4">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Token Rate Limit</div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-0.5 text-white">
                50,000<span className="text-xs text-slate-400 font-normal">/min</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Active Policy Rules</div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-0.5 text-white">
                128 Strict
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PRODUCT SUITE MATRIX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10 bg-gradient-to-b from-[#000000] via-[#0B0F19]/60 to-[#000000]">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="text-xs font-mono font-semibold text-[#06B6D4] tracking-widest uppercase">
            ENTERPRISE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
            The Product Suite Matrix
          </h2>
          <p className="text-sm text-slate-400 font-sans">
            Three defensive tiers engineered for complete sovereign oversight of LLM tokens and external model invocation conduits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Edge Content Guardrails & Compliance Ledger (ACTIVE / LIVE) */}
          <div className="relative rounded-2xl bg-[#0B0F19] border-2 border-[#14B8A6] p-7 shadow-[0_0_35px_rgba(20,184,166,0.25)] flex flex-col justify-between transition-all hover:shadow-[0_0_45px_rgba(20,184,166,0.35)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-teal-950/60 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                  <Shield className="w-6 h-6" />
                </div>
                {/* Glowing Active / Live Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-400/80 text-[11px] font-mono font-bold tracking-wider text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.4)]">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#14B8A6] animate-pulse" />
                  <span>ACTIVE / LIVE</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-mono leading-snug">
                  Edge Content Guardrails & Compliance Ledger
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-2.5 leading-relaxed">
                  Real-time token stream interception with instant violation isolation. Features Baseten hardware deployment connectivity, Sentinel Gateway validation, and client-side verifiable audit logging.
                </p>
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Baseten Hardware Node Routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Sentinel Gateway Key Attestation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Local Multi-Tenant Isolation Ledger</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <Link
                to="/auth"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#14B8A6] hover:bg-[#2dd4bf] text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(20,184,166,0.25)]"
              >
                <span>Launch in Console Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Shield PII Masking Firewall (GREYED-OUT / RESTRICTED) */}
          <div className="relative rounded-2xl bg-[#0B0F19]/40 border border-slate-800/80 p-7 opacity-75 grayscale-[30%] flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Lock className="w-6 h-6" />
                </div>
                {/* Greyed-out Pipeline Access Restricted badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono font-medium text-slate-400">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Pipeline Access Restricted</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-300 font-mono leading-snug">
                  Shield PII Masking Firewall
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-2.5 leading-relaxed">
                  High-throughput transformer layer scanning outgoing prompt tensors. Performs automatic entity substitution for Social Security Numbers, API keys, medical identifiers, and customer credentials.
                </p>
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-900 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Pre-Tokenizer Redaction Buffer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>HIPAA & GDPR Synthetic Re-hydration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Encrypted Zero-Knowledge Memory</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-900">
              <button
                disabled
                className="w-full py-2.5 px-4 rounded-lg bg-slate-900 text-slate-500 font-mono text-xs uppercase tracking-wider cursor-not-allowed border border-slate-800/60"
              >
                Requires Enterprise License
              </button>
            </div>
          </div>

          {/* Card 3: Deep-Audit SIEM Splunk Integration (GREYED-OUT / RESTRICTED) */}
          <div className="relative rounded-2xl bg-[#0B0F19]/40 border border-slate-800/80 p-7 opacity-75 grayscale-[30%] flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Database className="w-6 h-6" />
                </div>
                {/* Greyed-out Pipeline Access Restricted badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono font-medium text-slate-400">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Pipeline Access Restricted</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-300 font-mono leading-snug">
                  Deep-Audit SIEM Splunk Integration
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-2.5 leading-relaxed">
                  Enterprise telemetry exporter streaming immutable transaction logs directly into Splunk, Datadog, and AWS CloudWatch via signed HTTP Event Collector (HEC) conduits.
                </p>
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-900 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Direct HEC Syslog WebSocket Ingest</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Immutable HMAC-SHA256 Signatures</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Automated SOC2 Incident Forensics</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-900">
              <button
                disabled
                className="w-full py-2.5 px-4 rounded-lg bg-slate-900 text-slate-500 font-mono text-xs uppercase tracking-wider cursor-not-allowed border border-slate-800/60"
              >
                Requires Enterprise License
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture Deep Dive */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-mono font-semibold text-[#06B6D4] tracking-widest uppercase">
              ISOLATED RUNTIME SPECIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono leading-tight">
              Hardware-accelerated token firewall on edge nodes
            </h2>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Every inference payload sent to high-performance model clusters is validated through isolated client-side perimeter enclaves. If tokens trigger toxicity, jailbreaks, or extraction heuristics, the Sentinel Gateway terminates the pipe in 200 microseconds.
            </p>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F19] border border-cyan-500/20">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Latency Penalty: Wasm tensor inspection engine</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F19] border border-teal-500/20">
                <Terminal className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Dual Token Attestation: Sentinel Token + Baseten API Key</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0B1329] border border-cyan-500/30 rounded-2xl p-6 font-mono text-xs text-slate-300 shadow-[0_0_40px_rgba(6,182,212,0.12)]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="text-cyan-400 font-bold">SENTINEL_PIPE_INTERCEPTOR.TS</span>
              <span className="text-emerald-400 font-semibold">STATUS: VERIFIED</span>
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto text-[11px]">
{`// Cryptographic perimeter execution block
async function evaluateTokenStream(
  tokenChunk: string,
  guardrails: EdgeGuardrailAccess
): Promise<ComplianceVerdict> {
  const tokenHash = sha256(tokenChunk);
  
  // Verify dual key attestation in client enclave
  if (!guardrails.isUnlocked || !guardrails.sentinelGatewayToken) {
    throw new EnclaveSecurityException("ROUTE_CONTEXT_LOCKED");
  }

  // Sub-millisecond vector heuristic check
  const verdict = await SentinelWasmKernel.inspect(tokenChunk, {
    apiKey: guardrails.basetenApiKey,
    policyMatrix: "STRICT_COMPLIANCE"
  });

  return verdict; // 200 OK -> Stream directly to downstream client
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};
