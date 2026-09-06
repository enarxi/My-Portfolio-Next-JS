'use client';

import { useState } from 'react';

const TABS = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'footer', label: 'Footer & Socials' },
];

export default function CMSTabs({ heroContent, footerContent }) {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-1 p-1 bg-fg/5 border border-border rounded-xl mb-8 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-bg shadow-sm'
                : 'text-muted hover:text-fg hover:bg-fg/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'hero' && <div>{heroContent}</div>}
        {activeTab === 'footer' && <div>{footerContent}</div>}
      </div>
    </div>
  );
}
