import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserAccount } from '../context/AuthContext';
import {
  Shield,
  KeyRound,
  Lock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Cpu,
  Server,
  Database,
  ArrowLeft,
  ChevronRight,
  User,
  Mail,
} from 'lucide-react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, seedDemoAccount, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserAccount['role']>('operator');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect to cockpit if operator already holds an authenticated session
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (activeTab === 'signin') {
        const res = await signIn(email, password);
        if (res.success) {
          navigate('/dashboard');
        } else {
          setError(res.message);
        }
      } else {
        const res = await signUp({ email, fullName, password, role });
        if (res.success) {
          navigate('/dashboard');
        } else {
          setError(res.message);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error encountered');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    seedDemoAccount();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#000000] overflow-hidden text-zinc-100 font-mono">
      {/* =========================================================================
          2. LEFT PANEL - PERIMETER ENCLAVE SUMMARY (60% Width Layout Node)
          ========================================================================= */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-[#0B1329] border-r border-zinc-800/80 relative">
        {/* Ambient Subtle Cyber Glow */}
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-cyan-500/10 blur-[130px] pointer-events-none -z-10" />

        {/* Upper Node: Return link & gateway status badge */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-teal-400 hover:text-cyan-300 transition-colors tracking-wider uppercase font-semibold group"
          >
            <Shield className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <span>← RETURN TO PUBLIC PERIMETER</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] text-cyan-300 font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06B6D4]" />
            <span>• GATEWAY: ZERO LEAKAGE</span>
          </div>
        </div>

        {/* Center Hero Matrix */}
        <div className="max-w-xl space-y-8 my-auto py-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Perimeter Enclave Authentication Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-normal">
              Cryptographically verified access gate protecting model telemetry pipelines. All identity tokens, keys, and session records remain hermetic within sovereign local boundaries.
            </p>
          </div>

          {/* Bulleted Specifications Grid */}
          <div className="space-y-4 text-xs">
            {/* Row 1 */}
            <div className="p-4 rounded-xl bg-[#070D1F] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.08)] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-cyan-400 shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-cyan-300 tracking-wider uppercase text-[11px]">
                  LOCAL STORAGE BOUNDARIES
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans">
                  Multi-Tenant Sandbox isolation limits governed locally via localStorage boundaries.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="p-4 rounded-xl bg-[#070D1F] border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.08)] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-teal-950/90 border border-teal-500/40 text-teal-400 shrink-0 mt-0.5">
                <KeyRound className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-teal-300 tracking-wider uppercase text-[11px]">
                  SENTINEL TOOL ACTIVATION
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans">
                  Independent microservice validation mapping requiring explicit Sentinel Gateway Secret Tokens per tool activation.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="p-4 rounded-xl bg-[#070D1F] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.08)] flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-cyan-400 shrink-0 mt-0.5">
                <Server className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-cyan-300 tracking-wider uppercase text-[11px]">
                  SERVERLESS INFERENCE CONDUITS
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans">
                  OpenAI-compatible ingestion conduits hardwired directly to upstream serverless inference clusters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-400 tracking-wider">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span>• ENCLAVE ATTESTATION: VERIFIED</span>
          </div>
          <div className="text-slate-500 font-mono">
            STORAGE: <span className="text-cyan-400">localStorage.auth_users_directory</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. RIGHT PANEL - IDENTITY VERIFICATION TRANSACTION GATE (40% Width Node)
          ========================================================================= */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-8 bg-[#000000] relative">
        {/* Mobile-only return header */}
        <div className="lg:hidden w-full max-w-md flex items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-teal-400 hover:text-cyan-300 tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Perimeter</span>
          </Link>
          <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            ENCLAVE GATE
          </span>
        </div>

        {/* Identity Form Box: Edge-padded semi-transparent card */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0B0F19]/90 border border-cyan-500/25 shadow-[0_0_50px_rgba(6,182,212,0.12)] space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className="text-right text-[11px] text-cyan-400 tracking-widest uppercase flex items-center justify-end gap-1 font-bold">
              <span>› OPERATOR CLEARANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Identity Verification
            </h2>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Enter enterprise credentials to access active operator telemetry.
            </p>
          </div>

          {/* Navigation Tabs: SIGN IN and SIGN UP */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#000000] border border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setError(null);
              }}
              className={`py-2 px-3 rounded-lg font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setError(null);
              }}
              className={`py-2 px-3 rounded-lg font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields Stack */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {activeTab === 'signup' && (
              <>
                {/* Field 1: OPERATOR FULL NAME */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 uppercase tracking-wider text-[11px] font-bold">
                    OPERATOR FULL NAME
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Col. Sarah Connor"
                      className="w-full bg-[#000000] border border-cyan-500/30 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none shadow-[0_0_10px_rgba(6,182,212,0.06)]"
                      required
                    />
                  </div>
                </div>

                {/* Field 2: ASSIGNED OPERATOR ROLE */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 uppercase tracking-wider text-[11px] font-bold">
                    ASSIGNED OPERATOR ROLE
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserAccount['role'])}
                      className="w-full bg-[#000000] border border-cyan-500/30 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-3.5 text-cyan-300 focus:outline-none cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.06)]"
                    >
                      <option value="operator">Operator (Cockpit & Execution)</option>
                      <option value="admin">Administrator (Perimeter Mesh Control)</option>
                      <option value="security_auditor">Security Auditor (Zero-Trust Review)</option>
                      <option value="ml_engineer">ML Engineer (Cluster Alignment)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Field 3: ENTERPRISE EMAIL/USERNAME */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider text-[11px] font-bold">
                ENTERPRISE EMAIL/USERNAME
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@sentinel-matrix.internal"
                  className="w-full bg-[#000000] border border-cyan-500/30 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none shadow-[0_0_10px_rgba(6,182,212,0.06)]"
                  required
                />
              </div>
            </div>

            {/* Field 4: ACCESS PASSWORD */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 uppercase tracking-wider text-[11px] font-bold">
                ACCESS PASSWORD
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#000000] border border-cyan-500/30 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none shadow-[0_0_10px_rgba(6,182,212,0.06)]"
                  required
                />
              </div>
            </div>

            {/* Action Triggers: Primary neon-cyan button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-black bg-[#14B8A6] hover:bg-[#2dd4bf] active:bg-[#0d9488] transition-all shadow-[0_0_25px_rgba(20,184,166,0.35)] hover:shadow-[0_0_35px_rgba(20,184,166,0.55)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>
                {activeTab === 'signup'
                  ? 'PROVISION OPERATOR ENCLAVE'
                  : 'AUTHENTICATE & ENTER'}
              </span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </form>

          {/* Bypass Matrix: One-Click Demo Operator */}
          <div className="pt-2 text-center space-y-3">
            <div className="text-[11px] text-slate-500 font-mono tracking-widest uppercase">
              — OR BYPASS GATE —
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:bg-cyan-950/70 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>🛡️ ONE-CLICK DEMO OPERATOR (ALEX VANCE)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
