import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import HeroForm from './HeroForm';
import FooterForm from './FooterForm';
import AboutForm from './AboutForm';
import CMSTabs from './CMSTabs';
import {
  initFooterTable,
  dropFooterTable,
  getFooterContent,
  updateFooterContent,
  FOOTER_DEFAULTS,
} from '@/lib/footer-db';

export const dynamic = 'force-dynamic';

// ─── SERVER ACTIONS ────────────────────────────────────────────────────────

// Action to handle login
async function login(formData) {
  'use server';
  const password = formData.get('password');
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/',
    });
  }
}

// Action to handle logout
async function logout() {
  'use server';
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
}

// ── Hero Table Actions ───────────────────────────────────────────────────

// Action to create the hero table and insert default values
async function initHeroTable() {
  'use server';
  await sql`
    CREATE TABLE IF NOT EXISTS hero_content (
      id SERIAL PRIMARY KEY,
      greeting TEXT NOT NULL,
      name TEXT NOT NULL,
      roles TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const existing = await sql`SELECT * FROM hero_content LIMIT 1`;
  if (existing.length === 0) {
    await sql`
      INSERT INTO hero_content (greeting, name, roles, description, image_url)
      VALUES (
        'Hi, my name is',
        'Vencent Domingo.',
        '["Senior Frontend Web Developer.", "Wordpress Developer.", "SEO Specialist.", "Data Analyst."]',
        'Senior Frontend Web Developer with nearly 8 years of experience specializing in WordPress architecture, React, and Next.js. I have a proven track record of providing end-to-end technical ownership and automating frontend workflows to improve team efficiency. Let''s build high-performance web applications! 🚀',
        ''
      )
    `;
  }

  revalidatePath('/content-management');
  revalidatePath('/');
}

// Action to drop the hero table entirely
async function dropHeroTable(formData) {
  'use server';
  const confirmation = formData.get('confirmation');
  if (confirmation !== 'Delete hero table') return;
  await sql`DROP TABLE IF EXISTS hero_content`;
  revalidatePath('/content-management');
  revalidatePath('/');
}

// Action to update hero content
async function updateHero(formData) {
  'use server';
  const greeting = formData.get('greeting');
  const name = formData.get('name');
  const roles = formData.get('roles');
  const description = formData.get('description');
  const image_url = formData.get('image_url');

  const existing = await sql`SELECT * FROM hero_content LIMIT 1`;
  if (existing.length > 0) {
    await sql`
      UPDATE hero_content
      SET greeting    = ${greeting},
          name        = ${name},
          roles       = ${roles},
          description = ${description},
          image_url   = ${image_url},
          updated_at  = CURRENT_TIMESTAMP
      WHERE id = ${existing[0].id}
    `;
  } else {
    await sql`
      INSERT INTO hero_content (greeting, name, roles, description, image_url)
      VALUES (${greeting}, ${name}, ${roles}, ${description}, ${image_url})
    `;
  }
  revalidatePath('/content-management');
  revalidatePath('/');
}

// ── Footer Table Actions ─────────────────────────────────────────────────

// Action to initialize the footer table
async function initFooter() {
  'use server';
  await initFooterTable();
  revalidatePath('/content-management');
  revalidatePath('/');
}

// Action to drop the footer table
async function deleteFooterTable(formData) {
  'use server';
  const confirmation = formData.get('footer_confirmation');
  if (confirmation !== 'Delete footer table') return;
  await dropFooterTable();
  revalidatePath('/content-management');
  revalidatePath('/');
}

// Action to update footer content (called from FooterForm client component via prop)
async function saveFooterContent({ hire_me_text, hire_me_url, social_links }) {
  'use server';
  const result = await updateFooterContent({ hire_me_text, hire_me_url, social_links });
  if (result.success) {
    revalidatePath('/content-management');
    revalidatePath('/');
  }
  return result;
}


// ── About Table Actions ────────────────────────────────────────────────────

// Action to create the about table and insert default values
async function initAboutTable() {
  'use server';
  await sql`
    CREATE TABLE IF NOT EXISTS about_content (
      id SERIAL PRIMARY KEY,
      skills JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const existing = await sql`SELECT * FROM about_content LIMIT 1`;
  if (existing.length === 0) {
    const defaultSkills = {
      usingNow: [
        { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
      ],
      learning: [
        { name: 'NodeJS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }
      ],
      otherSkills: [
        { name: 'English C1/C2' },
        { name: 'Spanish B1/B2' }
      ]
    };
    await sql`
      INSERT INTO about_content (skills)
      VALUES (${JSON.stringify(defaultSkills)})
    `;
  }

  revalidatePath('/content-management');
  revalidatePath('/about');
}

// Action to drop the about table entirely
async function dropAboutTable(formData) {
  'use server';
  const confirmation = formData.get('about_confirmation');
  if (confirmation !== 'Delete about table') return;
  await sql`DROP TABLE IF EXISTS about_content`;
  revalidatePath('/content-management');
  revalidatePath('/about');
}

// Action to update about content
async function updateAbout(formData) {
  'use server';
  const skillsJson = formData.get('skills');
  let parsedSkills;
  try {
    parsedSkills = JSON.parse(skillsJson);
  } catch (e) {
    return { success: false, error: 'Invalid JSON format' };
  }

  const existing = await sql`SELECT * FROM about_content LIMIT 1`;
  if (existing.length > 0) {
    await sql`
      UPDATE about_content
      SET skills = ${skillsJson},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${existing[0].id}
    `;
  } else {
    await sql`
      INSERT INTO about_content (skills)
      VALUES (${skillsJson})
    `;
  }
  revalidatePath('/content-management');
  revalidatePath('/about');
  return { success: true };
}


// ─── SERVER COMPONENT ────────────────────────────────────────────────────

export default async function CMSPage() {
  // 1. Check Authentication
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true';

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-24 p-8 font-sans bg-bg border border-border rounded-xl shadow-sm text-fg">
        <h1 className="text-2xl font-heading font-bold mb-4 text-primary">Admin Access Required</h1>
        <p className="text-muted mb-6 text-base">Please enter the admin password to access the CMS.</p>
        <form action={login} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
            required
            className="w-full p-3 bg-fg/5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-fg"
          />
          <button type="submit" className="w-full py-3 bg-primary text-bg font-medium rounded-lg hover:opacity-90 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  // 2. Load Hero Data
  let heroData = null;
  let heroTableExists = true;
  try {
    const result = await sql`SELECT * FROM hero_content LIMIT 1`;
    if (result.length > 0) {
      heroData = result[0];
    } else {
      heroTableExists = false;
    }
  } catch {
    heroTableExists = false;
  }

  // 3. Load Footer Data
  const rawFooter = await getFooterContent();
  const footerData = rawFooter ?? FOOTER_DEFAULTS;
  const footerTableExists = rawFooter !== null;

  // 4. Load About Data
  let aboutData = null;
  let aboutTableExists = true;
  try {
    const result = await sql`SELECT * FROM about_content LIMIT 1`;
    if (result.length > 0) {
      aboutData = result[0];
    } else {
      aboutTableExists = false;
    }
  } catch {
    aboutTableExists = false;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans bg-bg text-fg min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Content Management System</h1>
        <form action={logout}>
          <button type="submit" className="px-4 py-2 text-base bg-fg/10 hover:bg-fg/20 text-fg rounded transition">
            Logout
          </button>
        </form>
      </div>

      {/* Tabbed Interface */}
      <CMSTabs
        // ── Hero Tab Content ──────────────────────────────────────────────
        heroContent={
          <div className="flex flex-col gap-8">
            {!heroTableExists || !heroData ? (
              <div className="bg-accent/10 border border-accent/30 text-fg p-6 rounded-xl shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-heading font-semibold mb-2 text-accent">Hero Database is missing or empty!</h2>
                <p className="mb-4 text-muted">
                  Click the button below to safely create the{' '}
                  <code className="bg-fg/10 px-1.5 py-0.5 rounded text-fg">hero_content</code> table and insert default values.
                </p>
                <form action={initHeroTable}>
                  <button type="submit" className="px-5 py-2.5 bg-accent hover:opacity-90 text-bg rounded-lg shadow transition font-medium">
                    Initialize Hero Table
                  </button>
                </form>
              </div>
            ) : (
              <section className="bg-fg/5 border border-border p-6 rounded-xl shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Update Hero Section</h2>
                <HeroForm updateHero={updateHero} heroData={heroData} />
                <p className="text-base text-muted mt-4">
                  Last updated: {new Date(heroData.updated_at).toLocaleString()}
                </p>
              </section>
            )}

            {heroTableExists && (
              <div className="p-6 border border-accent/50 bg-accent/10 rounded-xl">
                <h3 className="text-accent font-heading font-semibold mb-2">Danger Zone — Hero</h3>
                <p className="text-fg text-base mb-4">
                  Delete the hero table and all its data. This will hide the Hero section on the homepage.
                </p>
                <form action={dropHeroTable} className="flex flex-col gap-3">
                  <label className="text-base text-fg">
                    Type <strong className="text-accent select-all">Delete hero table</strong> below to confirm:
                  </label>
                  <input
                    type="text"
                    name="confirmation"
                    required
                    pattern="Delete hero table"
                    title="Please type exactly: Delete hero table"
                    className="w-1/2 md:w-full p-2 bg-bg border border-accent/50 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-fg placeholder:text-muted"
                    placeholder="Delete hero table"
                    autoComplete="off"
                  />
                  <button type="submit" className="self-start px-4 py-2 bg-accent text-bg hover:opacity-90 rounded transition text-base font-medium">
                    Delete Table
                  </button>
                </form>
              </div>
            )}
          </div>
        }

        // ── Footer Tab Content ────────────────────────────────────────────
        footerContent={
          <div className="flex flex-col gap-8">
            {!footerTableExists ? (
              <div className="bg-accent/10 border border-accent/30 text-fg p-6 rounded-xl shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-heading font-semibold mb-2 text-accent">Footer Database is not initialized!</h2>
                <p className="mb-4 text-muted">
                  Click the button below to create the{' '}
                  <code className="bg-fg/10 px-1.5 py-0.5 rounded text-fg">footer_content</code> table with default social links and Hire Me settings.
                </p>
                <p className="mb-4 text-base text-muted">
                  Note: The footer is currently showing built-in defaults. Initializing the table lets you customize it from this CMS.
                </p>
                <form action={initFooter}>
                  <button type="submit" className="px-5 py-2.5 bg-accent hover:opacity-90 text-bg rounded-lg shadow transition font-medium">
                    Initialize Footer Table
                  </button>
                </form>
              </div>
            ) : (
              <section className="bg-fg/5 border border-border p-6 rounded-xl shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-heading font-semibold mb-1 text-primary">Footer & Socials</h2>
                <p className="text-base text-muted mb-6">
                  Customize the Hire Me button and manage your social media links shown in the footer.
                </p>
                <FooterForm updateFooter={saveFooterContent} footerData={footerData} />
                {rawFooter?.updated_at && (
                  <p className="text-base text-muted mt-4">
                    Last updated: {new Date(rawFooter.updated_at).toLocaleString()}
                  </p>
                )}
              </section>
            )}

            {footerTableExists && (
              <div className="p-6 border border-accent/50 bg-accent/10 rounded-xl">
                <h3 className="text-accent font-heading font-semibold mb-2">Danger Zone — Footer</h3>
                <p className="text-fg text-base mb-4">
                  Delete the footer table. The footer will fall back to built-in defaults.
                </p>
                <form action={deleteFooterTable} className="flex flex-col gap-3">
                  <label className="text-base text-fg">
                    Type <strong className="text-accent select-all">Delete footer table</strong> below to confirm:
                  </label>
                  <input
                    type="text"
                    name="footer_confirmation"
                    required
                    pattern="Delete footer table"
                    title="Please type exactly: Delete footer table"
                    className="w-1/2 md:w-full p-2 bg-bg border border-accent/50 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-fg placeholder:text-muted"
                    placeholder="Delete footer table"
                    autoComplete="off"
                  />
                  <button type="submit" className="self-start px-4 py-2 bg-accent text-bg hover:opacity-90 rounded transition text-base font-medium">
                    Delete Table
                  </button>
                </form>
              </div>
            )}
          </div>
        }

        // ── About Tab Content ──────────────────────────────────────────────
        aboutContent={
          <div className="flex flex-col gap-8">
            {!aboutTableExists || !aboutData ? (
              <div className="bg-accent/10 border border-accent/30 text-fg p-6 rounded-xl shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-heading font-semibold mb-2 text-accent">About Database is missing or empty!</h2>
                <p className="mb-4 text-muted">
                  Click the button below to safely create the{' '}
                  <code className="bg-fg/10 px-1.5 py-0.5 rounded text-fg">about_content</code> table and insert default skills.
                </p>
                <form action={initAboutTable}>
                  <button type="submit" className="px-5 py-2.5 bg-accent hover:opacity-90 text-bg rounded-lg shadow transition font-medium">
                    Initialize About Table
                  </button>
                </form>
              </div>
            ) : (
              <section className="bg-fg/5 border border-border p-6 rounded-xl shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Update About Section</h2>
                <AboutForm updateAbout={updateAbout} aboutData={aboutData} />
                <p className="text-base text-muted mt-4">
                  Last updated: {new Date(aboutData.updated_at).toLocaleString()}
                </p>
              </section>
            )}

            {aboutTableExists && (
              <div className="p-6 border border-accent/50 bg-accent/10 rounded-xl">
                <h3 className="text-accent font-heading font-semibold mb-2">Danger Zone — About</h3>
                <p className="text-fg text-base mb-4">
                  Delete the about table and all its data.
                </p>
                <form action={dropAboutTable} className="flex flex-col gap-3">
                  <label className="text-base text-fg">
                    Type <strong className="text-accent select-all">Delete about table</strong> below to confirm:
                  </label>
                  <input
                    type="text"
                    name="about_confirmation"
                    required
                    pattern="Delete about table"
                    title="Please type exactly: Delete about table"
                    className="w-1/2 md:w-full p-2 bg-bg border border-accent/50 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-fg placeholder:text-muted"
                    placeholder="Delete about table"
                    autoComplete="off"
                  />
                  <button type="submit" className="self-start px-4 py-2 bg-accent text-bg hover:opacity-90 rounded transition text-base font-medium">
                    Delete Table
                  </button>
                </form>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
