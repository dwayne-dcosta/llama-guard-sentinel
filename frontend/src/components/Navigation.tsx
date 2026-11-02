import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Menu, X, KeyRound, LogOut } from 'lucide-react';
import { GuardrailModal } from './GuardrailModal';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isDashboardUnlocked } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-cyan-500/15 bg-[#000000]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-24 pt-3 pb-3">
          {/* Brand Logo featuring header-logo.png */}
          <Link
            to="/"
            className="flex items-center gap-3.5 text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group bg-transparent select-none"
          >
            <img
              src="/header-logo.png"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-transform group-hover:scale-105"
              alt="Sentinel Header Logo"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono font-extrabold text-base sm:text-lg tracking-tight text-white uppercase leading-none">
                <span>LLAMA GUARD</span>
                <span className="text-cyan-400">SENTINEL</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                Sovereign Edge Enclave
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/overview"
              className={`font-mono text-xs tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 ${
                isActive('/overview') ? 'text-cyan-400 font-bold border-b border-cyan-400 pb-1' : 'text-slate-300'
              }`}
            >
              Overview
            </Link>
            <Link
              to="/docs"
              className={`font-mono text-xs tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 ${
                isActive('/docs') ? 'text-cyan-400 font-bold border-b border-cyan-400 pb-1' : 'text-slate-300'
              }`}
            >
              Documentation
            </Link>
            <Link
              to="/dashboard"
              className={`font-mono text-xs tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 ${
                isActive('/dashboard') ? 'text-cyan-400 font-bold border-b border-cyan-400 pb-1' : 'text-slate-300'
              }`}
            >
              Console Hub
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isDashboardUnlocked ? 'Keys Active' : 'Provision Keys'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    navigate('/auth');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase text-black bg-[#14B8A6] hover:bg-[#2dd4bf] shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] cursor-pointer"
              >
                <span>Access Gate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-cyan-500/20 bg-[#000000] px-4 py-5 space-y-4">
            <div className="flex flex-col space-y-3 font-mono text-xs tracking-wider uppercase">
              <Link
                to="/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-slate-200 hover:text-cyan-400 hover:bg-slate-900"
              >
                Overview
              </Link>
              <Link
                to="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-slate-200 hover:text-cyan-400 hover:bg-slate-900"
              >
                Documentation
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-slate-200 hover:text-cyan-400 hover:bg-slate-900"
              >
                Console Hub
              </Link>
            </div>
            <div className="pt-3 border-t border-slate-900">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase text-black bg-[#14B8A6] hover:bg-[#2dd4bf] shadow-[0_0_15px_rgba(20,184,166,0.3)]"
              >
                <span>{user ? 'Open Console Hub' : 'Access Gate'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <GuardrailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
