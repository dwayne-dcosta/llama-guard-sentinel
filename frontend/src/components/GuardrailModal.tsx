import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, KeyRound, Lock, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface GuardrailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuardrailModal: React.FC<GuardrailModalProps> = ({ isOpen, onClose }) => {
  const { guardrails, saveGuardrails, revokeGuardrails } = useAuth();
  const [sentinelToken, setSentinelToken] = useState('');
  const [basetenKey, setBasetenKey] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (guardrails) {
      setSentinelToken(guardrails.sentinelGatewayToken || '');
      setBasetenKey(guardrails.basetenApiKey || '');
    }
  }, [guardrails, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const res = saveGuardrails(sentinelToken, basetenKey);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setTimeout(() => {
        onClose();
        setFeedback(null);
      }, 1200);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleRevoke = () => {
    revokeGuardrails();
    setSentinelToken('');
    setBasetenKey('');
    setFeedback({ type: 'error', message: 'Guardrail attestation revoked.' });
    setTimeout(() => {
      onClose();
      setFeedback(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B0F19] border border-cyan-500/30 p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-slate-100 font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Provision Edge Guardrail Keys
            </h3>
            <p className="text-xs text-slate-400">
              Configure Sentinel Gateway Token & Personal Baseten API Key
            </p>
          </div>
        </div>

        {feedback && (
          <div
            className={`mb-4 p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Sentinel Gateway Secret Token
            </label>
            <input
              type="password"
              value={sentinelToken}
              onChange={(e) => setSentinelToken(e.target.value)}
              placeholder="snt_gw_live_••••••••"
              className="w-full bg-[#000000] border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Personal Baseten API Key
            </label>
            <input
              type="password"
              value={basetenKey}
              onChange={(e) => setBasetenKey(e.target.value)}
              placeholder="b10_prod_••••••••"
              className="w-full bg-[#000000] border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleRevoke}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
            >
              Revoke Keys
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#14B8A6] hover:bg-[#2dd4bf] transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)]"
              >
                Save & Attest
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
