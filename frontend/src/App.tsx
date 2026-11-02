import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MarketingLayout } from './layouts/MarketingLayout';
import { Index } from './pages/Index';
import { Overview } from './pages/Overview';
import { Docs } from './pages/Docs';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing & System Reference Matrix */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/docs" element={<Docs />} />
          </Route>

          {/* Operator Authentication Portal */}
          <Route path="/auth" element={<Auth />} />

          {/* Secure Operator Cockpit Terminal */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
