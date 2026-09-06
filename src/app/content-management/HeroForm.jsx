'use client';

import { useState } from 'react';

export default function HeroForm({ updateHero, heroData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <form 
      action={async (formData) => {
        setIsSaving(true);
        await updateHero(formData);
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }} 
      className="flex flex-col gap-4"
    >
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Greeting</label>
        <input 
          name="greeting"
          required
          defaultValue={heroData?.greeting || ""}
          placeholder="Hi, my name is"
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg"
        />
      </div>
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Name</label>
        <input 
          name="name"
          required
          defaultValue={heroData?.name || ""}
          placeholder="Vencent Domingo."
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg"
        />
      </div>
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Roles (JSON Array)</label>
        <textarea 
          name="roles"
          required
          rows={3}
          defaultValue={heroData?.roles || ""}
          placeholder='["Role 1", "Role 2"]'
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg"
        />
      </div>
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Description</label>
        <textarea 
          name="description"
          required
          rows={4}
          defaultValue={heroData?.description || ""}
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg"
        />
      </div>
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Image URL (Optional)</label>
        <input 
          name="image_url"
          defaultValue={heroData?.image_url || ""}
          placeholder="https://..."
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isSaving || showSuccess} 
        className={`self-end px-5 py-2.5 rounded-lg shadow transition-all duration-300 font-medium flex items-center justify-center gap-2 min-w-[180px]
          ${showSuccess 
            ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
            : "bg-primary hover:opacity-80 text-bg disabled:opacity-50"
          }`}
      >
        {isSaving && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {showSuccess && !isSaving && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}

        {isSaving ? "Saving..." : showSuccess ? "Saved!" : "Update Hero Content"}
      </button>
    </form>
  );
}
