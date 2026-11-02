import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Cpu,
  Server,
  Layers,
  ArrowRight,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  Database,
  CheckCircle2,
  FileText,
  KeyRound,
  Terminal,
} from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-mono cyber-grid relative selection:bg-cyan-500 selection:text-black">
      {/* Top Ambient Cyber Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-teal-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Hero Executive Whitepaper Header */}
      <section className="border-b border-cyan-500/20 bg-[#0B0F19]/80 backdrop-blur-md pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300 font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06B6D4]" />
            <span>EXECUTIVE BRIEFING · C-SUITE SECURITY WHITEPAPER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            The Sovereign AI Mandate: Navigating the Ingestion Paradox
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            A comprehensive strategic evaluation of enterprise generative model adoption risks, cognitive data exfiltration pipelines, and the operational necessity of sub-millisecond edge perimeter defense.
          </p>

          {/* Key Executive KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono">
            <div className="p-3.5 rounded-xl bg-[#070D1F] border border-cyan-500/25 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Perimeter Leakage</div>
              <div className="text-xl font-bold text-cyan-400 tabular-nums">0.00%</div>
              <div className="text-[10px] text-slate-500">Hermetic Isolation</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070D1F] border border-teal-500/25 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Interception Latency</div>
              <div className="text-xl font-bold text-teal-300 tabular-nums">&lt;20 ms</div>
              <div className="text-[10px] text-slate-500">Sub-Millisecond Heuristics</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070D1F] border border-cyan-500/25 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">BYOM Portability</div>
              <div className="text-xl font-bold text-cyan-300 tabular-nums">100%</div>
              <div className="text-[10px] text-slate-500">Zero Source Recompilation</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070D1F] border border-slate-700/60 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">External DB Footprint</div>
              <div className="text-xl font-bold text-white tabular-nums">ZERO</div>
              <div className="text-[10px] text-slate-500">Client-Side Enclave</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* =======================================================================
            PILLAR 1: THE ENTERPRISE PROBLEM: THE AI INGESTION PARADOX
            ======================================================================= */}
        <section className="space-y-8">
          <div className="space-y-2 pb-4 border-b border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Section 01 · Vulnerability Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              The Enterprise Problem: The AI Ingestion Paradox
            </h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            <p>
              Across Global 2000 enterprises, artificial intelligence adoption has accelerated from experimental lab sandboxes into mission-critical production workflows. However, this velocity has introduced the most significant data security dilemma of the cloud era: <strong className="text-white font-mono">The Data Exfiltration Pipeline</strong>.
            </p>

            <p>
              In their rush to deploy LLM-powered applications, software engineering teams are wiring generative prompts directly into external, third-party inference endpoints. Under standard architectures, unencrypted tokens—rich with intellectual property, customer data, and system configurations—are streamed outbound over the public internet without an inline firewall, network perimeter, or real-time security ledger.
            </p>

            {/* In-depth Threat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 font-mono text-xs">
              {/* Threat 1 */}
              <div className="p-6 rounded-2xl bg-[#0B0F19] border border-rose-500/30 space-y-3 shadow-[0_0_30px_rgba(244,63,94,0.06)]">
                <div className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>1. Context Window Poisoning</span>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  Adversaries and untrusted data sources introduce malicious, indirect prompt injection strings into internal ingestion pipelines. In RAG architectures, retrieved third-party documents can silently overwrite system instructions, jailbreaking models into bypassing developer constraints, disabling authorization gates, and executing unauthorized sub-routine calls.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-rose-300">Consequence:</strong> Silent corruption of model decision trees and unauthorized remote instruction execution.
                </div>
              </div>

              {/* Threat 2 */}
              <div className="p-6 rounded-2xl bg-[#0B0F19] border border-amber-500/30 space-y-3 shadow-[0_0_30px_rgba(245,158,11,0.06)]">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-xs">
                  <TrendingDown className="w-4 h-4 text-amber-400" />
                  <span>2. Accidental Metadata Resignations</span>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  Developers and autonomous agents routinely concatenate database schemas, cloud infrastructure secrets, and proprietary source code directly into conversational system prompt arrays. When routed out to centralized commercial providers, this sensitive metadata is irreversibly logged, stored, and potentially indexed for future foundation model training cycles.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-amber-300">Consequence:</strong> Irreversible loss of corporate secrets, API keys, and intellectual property.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070D1F] border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
              <span className="text-white font-bold uppercase text-[11px]">Executive Consensus:</span>
              <p className="font-sans text-xs">
                Enterprises cannot afford to treat AI inference as a simple REST API consumer call. Inference endpoints represent the widest untracked data egress conduit inside modern IT estates, demanding an immutable perimeter firewall.
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================================
            PILLAR 2: THE SENTINEL INTERCEPTION THESIS
            ======================================================================= */}
        <section className="space-y-8">
          <div className="space-y-2 pb-4 border-b border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Section 02 · The Solution Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              The Sentinel Interception Thesis: Security at the Edge
            </h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            <p>
              To solve the AI Ingestion Paradox without strangling developer agility, Sentinel abandons slow, post-hoc cloud log auditing in favor of a proactive paradigm: <strong className="text-white font-mono">Real-Time In-Line Interception at the Outbox Perimeter</strong>.
            </p>

            <p>
              Llama Guard Sentinel functions as a transparent, high-speed reverse proxy sitting directly between enterprise software clients and upstream compute clusters. Operating with a latency footprint under 20 milliseconds, Sentinel acts as an active gatekeeper that analyzes, cleanses, and cryptographically attests to the structural integrity of every token chunk <strong className="text-cyan-400 font-mono">before</strong> it crosses the enterprise perimeter.
            </p>

            {/* Architecture Process Steps */}
            <div className="space-y-3 font-mono text-xs my-6">
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/25 flex items-start gap-4">
                <span className="text-base font-bold text-cyan-400 shrink-0">01</span>
                <div className="space-y-1">
                  <span className="font-bold text-white uppercase text-[11px]">Outbox Packet Trapping & Interception</span>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    Client application requests are captured at the local socket bridge. Inbound payloads are held in client memory while vector heuristic parsers evaluate token sequences against enterprise compliance rules.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-teal-500/25 flex items-start gap-4">
                <span className="text-base font-bold text-teal-300 shrink-0">02</span>
                <div className="space-y-1">
                  <span className="font-bold text-white uppercase text-[11px]">Real-Time Entropy & Pattern Scrubbing</span>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    High-entropy cloud credentials, Social Security Numbers, internal domain endpoints, and recursive jailbreak patterns are intercepted. Unsafe tokens are quarantined instantly, triggering automated HTTP 403 safety termination with zero token loss.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-cyan-500/25 flex items-start gap-4">
                <span className="text-base font-bold text-cyan-400 shrink-0">03</span>
                <div className="space-y-1">
                  <span className="font-bold text-white uppercase text-[11px]">Cryptographic Dual-Attestation & Ingestion</span>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    Cleared packets receive a cryptographic attestation header (<code className="text-cyan-300">sentinel-local-dev-secret</code>) paired with an encrypted remote authorization key (<code className="text-teal-300">X-Fireworks-Key</code>), releasing the clean packet to the target inference node.
                  </p>
                </div>
              </div>
            </div>

            <p>
              By moving enforcement to the outbox edge, compliance officers gain complete certainty: malicious injections are quarantined before reaching model weights, and proprietary corporate telemetry is never leaked to external parties.
            </p>
          </div>
        </section>

        {/* =======================================================================
            PILLAR 3: COGNITIVE RE-ENTRANCY & THE SOVEREIGN VALUE OF BYOM
            ======================================================================= */}
        <section className="space-y-8">
          <div className="space-y-2 pb-4 border-b border-teal-500/30">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Section 03 · Enterprise Strategic Economics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Cognitive Re-Entrancy & The Sovereign Value of BYOM
            </h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            <p>
              Beyond perimeter defense, the greatest systemic risk confronting enterprise AI leaders is <strong className="text-white font-mono">vendor infrastructure lock-in</strong>. When application logic is hardcoded to a single proprietary cloud API, the enterprise yields operational sovereignty—exposing the organization to unilateral price increases, API deprecations, geographic data boundary violations, and systemic cloud outages.
            </p>

            <p>
              Sentinel introduces a transformative operational doctrine: <strong className="text-white font-mono">Bring Your Own Model (BYOM)</strong> through strict architectural decoupling.
            </p>

            {/* Strategic Value Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-[#0B0F19] border border-cyan-500/20 space-y-2">
                <div className="text-cyan-300 font-bold uppercase flex items-center gap-2 text-[11px]">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>Local Unified Memory</span>
                </div>
                <p className="text-slate-400 font-sans text-xs leading-relaxed">
                  Engineers run lightweight, on-premise models (<code className="text-cyan-300">llama-3-8b-instruct-local</code>) on local Apple Silicon workstations or intranet servers during prototyping, cutting cloud API spend to zero.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0F19] border border-teal-500/20 space-y-2">
                <div className="text-teal-300 font-bold uppercase flex items-center gap-2 text-[11px]">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span>Serverless GPU Clusters</span>
                </div>
                <p className="text-slate-400 font-sans text-xs leading-relaxed">
                  During production scale spikes, operators redirect traffic seamlessly to dedicated Baseten H100 clusters (<code className="text-teal-300">meta-models/muse-spark-open-1026</code>) with high-throughput hardware acceleration.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-700/60 space-y-2">
                <div className="text-slate-200 font-bold uppercase flex items-center gap-2 text-[11px]">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Dynamic Zero-Code Flip</span>
                </div>
                <p className="text-slate-400 font-sans text-xs leading-relaxed">
                  Infrastructure transitions require only changing a single base URL string in the cockpit. No backend redeployments, no refactoring, and zero operational downtime.
                </p>
              </div>
            </div>

            <h3 className="text-base font-bold font-mono text-white uppercase tracking-wider pt-2">
              The Bottom Line for Executive Decision-Makers
            </h3>
            <p>
              By combining sub-millisecond outbox filtering with decentralized model flexibility, Sentinel converts AI adoption from an unmonitored security gamble into a compliant, hardened enterprise asset. Organizations gain the freedom to deploy open-weights models anywhere in the world while guaranteeing that compliance boundaries (EU AI Act, DPDP, HIPAA) remain inviolable.
            </p>
          </div>
        </section>

        {/* Executive Action Call to Action Card */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0B1329] to-[#070D1F] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.12)] space-y-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
                EXPERIENCE THE PERIMETER MATRIX
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                Ready to Inspect Live Model Telemetry?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-xl">
                Launch our interactive Operator Cockpit, dispatch verified packets across active tunnel bridges, and trigger real-time adversarial attack simulations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 font-mono text-xs">
              <Link
                to="/docs"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-950/40 transition-all text-center"
              >
                System Documentation
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-black bg-[#14B8A6] hover:bg-[#2dd4bf] transition-all shadow-[0_0_25px_rgba(20,184,166,0.35)] text-center cursor-pointer"
              >
                <span>Launch Cockpit</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
