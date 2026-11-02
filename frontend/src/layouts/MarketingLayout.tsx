import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingHeader } from '../components/MarketingHeader';
import { MarketingFooter } from '../components/MarketingFooter';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
      <MarketingHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
};
