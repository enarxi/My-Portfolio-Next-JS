'use client';

import { useState } from 'react';

export default function AboutForm({ updateAbout, aboutData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Fallback to default if skills isn't present
  const defaultSkills = {
    usingNow: [],
    learning: [],
    otherSkills: []
  };

  const skills = aboutData?.skills || defaultSkills;

  return (
    <form 
      action={async (formData) => {
        setIsSaving(true);
        setError(null);
        
        // We will construct the skills JSON object
        try {
          const usingNow = JSON.parse(formData.get('usingNow'));
          const learning = JSON.parse(formData.get('learning'));
          const otherSkills = JSON.parse(formData.get('otherSkills'));
          
          const newSkills = { usingNow, learning, otherSkills };
          formData.set('skills', JSON.stringify(newSkills));
          
          const result = await updateAbout(formData);
          if (result && !result.success) {
             setError(result.error || 'Failed to update.');
          } else {
             setShowSuccess(true);
             setTimeout(() => setShowSuccess(false), 3000);
          }
        } catch (e) {
          setError('Invalid JSON format. Please check your syntax.');
        } finally {
          setIsSaving(false);
        }
      }} 
      className="flex flex-col gap-4"
    >
      {error && <div className="text-red-500 font-semibold mb-2">{error}</div>}
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Using Now (JSON Array)</label>
        <textarea 
          name="usingNow"
          required
          rows={5}
          defaultValue={JSON.stringify(skills.usingNow || [], null, 2)}
          placeholder='[{"name": "React", "iconUrl": "https://..."}]'
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg font-mono text-sm"
        />
      </div>
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Learning (JSON Array)</label>
        <textarea 
          name="learning"
          required
          rows={5}
          defaultValue={JSON.stringify(skills.learning || [], null, 2)}
          placeholder='[{"name": "NodeJS", "iconUrl": "https://..."}]'
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg font-mono text-sm"
        />
      </div>
      <div>
        <label className="text-base font-semibold mb-1 block text-fg">Other Skills (JSON Array)</label>
        <textarea 
          name="otherSkills"
          required
          rows={4}
          defaultValue={JSON.stringify(skills.otherSkills || [], null, 2)}
          placeholder='[{"name": "English C1/C2"}]'
          className="w-full p-2 bg-bg border border-border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg font-mono text-sm"
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

        {isSaving ? "Saving..." : showSuccess ? "Saved!" : "Update About Content"}
      </button>
    </form>
  );
}
