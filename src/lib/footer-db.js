import { neon } from '@neondatabase/serverless';

// Lazy SQL getter — only connects when a DB function is actually invoked.
function getSQL() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.');
  }
  return neon(process.env.DATABASE_URL);
}

// ── Default Fallback Data ──────────────────────────────────────────────────
// Used when the DB table has not been initialized or is unreachable.
export const FOOTER_DEFAULTS = {
  hire_me_text: 'HIRE ME',
  hire_me_url: '/contact',
  social_links: [
    { id: '1', name: 'X / TWITTER', url: 'https://twitter.com' },
    { id: '2', name: 'BLUESKY', url: 'https://bsky.app' },
    { id: '3', name: 'GITHUB', url: 'https://github.com' },
    { id: '4', name: 'LINKEDIN', url: 'https://linkedin.com' },
  ],
};

// ── URL Validation ─────────────────────────────────────────────────────────
/**
 * Returns true if the url is:
 * - an absolute URL (http:// or https://)
 * - a mailto: link
 * - an internal relative path starting with /
 */
export function isValidUrl(url) {
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

// ── Init Footer Table ──────────────────────────────────────────────────────
export async function initFooterTable() {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS footer_content (
      id SERIAL PRIMARY KEY,
      hire_me_text TEXT NOT NULL DEFAULT 'HIRE ME',
      hire_me_url  TEXT NOT NULL DEFAULT '/contact',
      social_links JSONB NOT NULL DEFAULT '[]',
      updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const existing = await sql`SELECT * FROM footer_content LIMIT 1`;
  if (existing.length === 0) {
    await sql`
      INSERT INTO footer_content (hire_me_text, hire_me_url, social_links)
      VALUES (
        ${FOOTER_DEFAULTS.hire_me_text},
        ${FOOTER_DEFAULTS.hire_me_url},
        ${JSON.stringify(FOOTER_DEFAULTS.social_links)}
      )
    `;
  }
}

// ── Drop Footer Table ──────────────────────────────────────────────────────
export async function dropFooterTable() {
  const sql = getSQL();
  await sql`DROP TABLE IF EXISTS footer_content`;
}

// ── Get Footer Content ─────────────────────────────────────────────────────
/**
 * Returns the footer content row, or null if unavailable.
 * Caller should fall back to FOOTER_DEFAULTS if null is returned.
 */
export async function getFooterContent() {
  try {
    const sql = getSQL();
    const rows = await sql`SELECT * FROM footer_content LIMIT 1`;
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      hire_me_text: row.hire_me_text,
      hire_me_url: row.hire_me_url,
      // Neon returns JSONB as already parsed; guard both cases
      social_links: Array.isArray(row.social_links)
        ? row.social_links
        : JSON.parse(row.social_links || '[]'),
      updated_at: row.updated_at,
    };
  } catch {
    return null;
  }
}

// ── Update Footer Content ──────────────────────────────────────────────────
/**
 * Validates and persists footer content.
 * Returns { success: true } or { success: false, error: string }.
 */
export async function updateFooterContent({ hire_me_text, hire_me_url, social_links }) {
  // --- Server-side validation ---
  if (!hire_me_text || hire_me_text.trim().length === 0) {
    return { success: false, error: 'Hire Me label is required.' };
  }
  if (!isValidUrl(hire_me_url)) {
    return {
      success: false,
      error:
        'Hire Me URL is invalid. Use https://, http://, mailto:, or an internal path like /contact.',
    };
  }
  if (!Array.isArray(social_links)) {
    return { success: false, error: 'Social links must be an array.' };
  }
  for (const link of social_links) {
    if (!link.name || link.name.trim().length === 0) {
      return { success: false, error: 'Each social link must have a name.' };
    }
    if (!isValidUrl(link.url)) {
      return {
        success: false,
        error: `Social link "${link.name}" has an invalid URL. Use https://, http://, or mailto:.`,
      };
    }
  }

  try {
    const sql = getSQL();
    const existing = await sql`SELECT id FROM footer_content LIMIT 1`;
    if (existing.length > 0) {
      await sql`
        UPDATE footer_content
        SET hire_me_text = ${hire_me_text.trim()},
            hire_me_url  = ${hire_me_url.trim()},
            social_links = ${JSON.stringify(social_links)},
            updated_at   = CURRENT_TIMESTAMP
        WHERE id = ${existing[0].id}
      `;
    } else {
      await sql`
        INSERT INTO footer_content (hire_me_text, hire_me_url, social_links)
        VALUES (${hire_me_text.trim()}, ${hire_me_url.trim()}, ${JSON.stringify(social_links)})
      `;
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: `Database error: ${err.message}` };
  }
}
