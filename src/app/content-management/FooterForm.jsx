'use client';

import { useState, useId } from 'react';

// ── URL validation (mirrors server-side) ──────────────────────────────────
function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('mailto:')) return trimmed.length > 7;
  if (trimmed.startsWith('/')) return trimmed.length > 1;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function UrlInput({ value, onChange, placeholder, id, required = true }) {
  const invalid = value.length > 0 && !isValidUrl(value);
  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full p-2 bg-bg border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg transition
          ${invalid ? 'border-red-500 focus:ring-red-400' : 'border-border'}`}
      />
      {invalid && (
        <p className="text-xs text-red-500">
          Use https://, http://, mailto:, or an internal path like /contact
        </p>
      )}
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ── Social Link Row ───────────────────────────────────────────────────────
function SocialLinkRow({ link, index, onChange, onRemove }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-fg/5 border border-border rounded-lg">
      <div className="flex-1 flex flex-col gap-2">
        <input
          type="text"
          value={link.name}
          onChange={(e) => onChange(index, 'name', e.target.value)}
          placeholder="Label (e.g. GITHUB)"
          required
          className={`w-full p-2 bg-bg border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg text-sm transition
            ${link.name.trim().length === 0 ? 'border-red-400' : 'border-border'}`}
        />
        <UrlInput
          id={`social-url-${index}`}
          value={link.url}
          onChange={(val) => onChange(index, 'url', val)}
          placeholder="https://github.com/username"
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-2 p-1.5 text-muted hover:text-red-500 transition rounded"
        aria-label="Remove social link"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────
export default function FooterForm({ updateFooter, footerData }) {
  const [hireMeText, setHireMeText] = useState(footerData?.hire_me_text ?? 'HIRE ME');
  const [hireMeUrl, setHireMeUrl] = useState(footerData?.hire_me_url ?? '/contact');
  const [socialLinks, setSocialLinks] = useState(
    Array.isArray(footerData?.social_links) ? footerData.social_links : []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const uid = useId();

  const addLink = () => {
    setSocialLinks((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, name: '', url: '' },
    ]);
  };

  const updateLink = (index, field, value) => {
    setSocialLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeLink = (index) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const hasClientErrors = () => {
    if (hireMeText.trim().length === 0) return true;
    if (!isValidUrl(hireMeUrl)) return true;
    for (const link of socialLinks) {
      if (link.name.trim().length === 0 || !isValidUrl(link.url)) return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasClientErrors()) return;

    setIsSaving(true);
    setServerError('');
    setShowSuccess(false);

    const result = await updateFooter({
      hire_me_text: hireMeText,
      hire_me_url: hireMeUrl,
      social_links: socialLinks,
    });

    setIsSaving(false);
    if (result?.success === false) {
      setServerError(result.error ?? 'An unknown error occurred.');
    } else {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* ── Hire Me Button Settings ─────────────────────────── */}
      <section>
        <h3 className="text-base font-heading font-semibold text-fg mb-3">Hire Me Button</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor={`${uid}-label`} className="text-sm font-semibold mb-1 block text-fg">
              Button Label
            </label>
            <input
              id={`${uid}-label`}
              type="text"
              value={hireMeText}
              onChange={(e) => setHireMeText(e.target.value)}
              placeholder="HIRE ME"
              required
              className={`w-full p-2 bg-bg border rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none text-fg transition
                ${hireMeText.trim().length === 0 ? 'border-red-400' : 'border-border'}`}
            />
            {hireMeText.trim().length === 0 && (
              <p className="text-xs text-red-500 mt-1">Label is required.</p>
            )}
          </div>
          <div>
            <label htmlFor={`${uid}-url`} className="text-sm font-semibold mb-1 block text-fg">
              Button URL
            </label>
            <UrlInput
              id={`${uid}-url`}
              value={hireMeUrl}
              onChange={setHireMeUrl}
              placeholder="/contact or https://calendly.com/..."
            />
            <p className="text-xs text-muted mt-1">
              Supports: <code className="bg-fg/10 px-1 rounded">/contact</code>,{' '}
              <code className="bg-fg/10 px-1 rounded">mailto:you@email.com</code>,{' '}
              <code className="bg-fg/10 px-1 rounded">https://calendly.com/...</code>
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Social Links ─────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-heading font-semibold text-fg">Social Links</h3>
          <button
            type="button"
            onClick={addLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-fg/10 hover:bg-fg/20 text-fg rounded transition font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add Link
          </button>
        </div>

        {socialLinks.length === 0 ? (
          <p className="text-sm text-muted italic py-4 text-center border border-dashed border-border rounded-lg">
            No social links yet. Click "Add Link" to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {socialLinks.map((link, i) => (
              <SocialLinkRow
                key={link.id ?? i}
                link={link}
                index={i}
                onChange={updateLink}
                onRemove={removeLink}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Server Error ──────────────────────────────────────── */}
      {serverError && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mt-0.5 shrink-0">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          {serverError}
        </div>
      )}

      {/* ── Submit ────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isSaving || showSuccess || hasClientErrors()}
        className={`self-end px-5 py-2.5 rounded-lg shadow transition-all duration-300 font-medium flex items-center justify-center gap-2 min-w-[200px] disabled:opacity-50
          ${showSuccess
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
            : 'bg-primary hover:opacity-80 text-bg'
          }`}
      >
        {isSaving && <Spinner />}
        {showSuccess && !isSaving && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isSaving ? 'Saving...' : showSuccess ? 'Saved!' : 'Update Footer & Socials'}
      </button>
    </form>
  );
}
