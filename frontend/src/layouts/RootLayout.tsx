import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
      <Navigation />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Sentinel Matrix Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Local Isolated State Runtime</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/docs" className="hover:text-slate-300 transition-colors">
              Documentation
            </Link>
            <Link to="/auth" className="hover:text-slate-300 transition-colors">
              Gate Portal
            </Link>
            <Link to="/dashboard" className="hover:text-slate-300 transition-colors">
              Operator Cockpit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
