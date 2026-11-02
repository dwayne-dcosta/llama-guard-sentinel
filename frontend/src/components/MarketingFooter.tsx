import React from 'react';
import { Link } from 'react-router-dom';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 select-none">
          <img
            src="/header-logo.png"
            className="h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            alt="Sentinel Header Logo"
          />
          <span className="font-mono font-bold text-xs text-white uppercase tracking-wider">
            Llama Guard <span className="text-cyan-400">Sentinel</span>
          </span>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            · Sovereign Guardrails Runtime
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-slate-400">
          <Link to="/overview" className="hover:text-cyan-400 transition-colors">
            Overview
          </Link>
          <Link to="/docs" className="hover:text-cyan-400 transition-colors">
            Documentation
          </Link>
          <Link to="/auth" className="hover:text-cyan-400 transition-colors">
            Access Gate
          </Link>
          <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
            Console Hub
          </Link>
        </div>
      </div>
    </footer>
  );
};
