import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import HeroForm from './HeroForm';

export const dynamic = 'force-dynamic';

// --- SERVER ACTIONS ---

// Action to handle login
async function login(formData) {
  'use server'
  const password = formData.get('password');
  
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true, 
      path: '/' 
    });
  }
}

// Action to handle logout
async function logout() {
  'use server'
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
}

// Action to create the table and insert default values
async function initTable() {
  'use server'
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

  // Insert default values if table is empty
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

// Action to drop the table entirely
async function dropTable(formData) {
  'use server'
  const confirmation = formData.get('confirmation');
  if (confirmation !== 'Delete hero table') {
    return;
  }
  
  await sql`DROP TABLE IF EXISTS hero_content`;
  revalidatePath('/content-management');
  revalidatePath('/');
}

// Action to update hero content
async function updateHero(formData) {
  'use server'
  const greeting = formData.get('greeting');
  const name = formData.get('name');
  const roles = formData.get('roles');
  const description = formData.get('description');
  const image_url = formData.get('image_url');
  
  const existing = await sql`SELECT * FROM hero_content LIMIT 1`;
  
  if (existing.length > 0) {
    const id = existing[0].id;
    await sql`
      UPDATE hero_content 
      SET greeting = ${greeting}, 
          name = ${name}, 
          roles = ${roles}, 
          description = ${description}, 
          image_url = ${image_url},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  } else {
    // Fallback if somehow deleted
    await sql`
      INSERT INTO hero_content (greeting, name, roles, description, image_url)
      VALUES (${greeting}, ${name}, ${roles}, ${description}, ${image_url})
    `;
  }
  
  revalidatePath('/content-management');
  revalidatePath('/');
}


// --- SERVER COMPONENT ---

export default async function CMSPage() {
  // 1. Check Authentication
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true';

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-24 p-8 font-sans bg-bg border border-border rounded-xl shadow-sm text-fg">
        <h1 className="text-2xl font-heading font-bold mb-4 text-primary">Admin Access Required</h1>
        <p className="text-muted mb-6 text-sm">Please enter the admin password to access the CMS.</p>
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


  // 2. Load Dashboard Data (Only runs if authenticated)
  let heroData = null;
  let tableExists = true;

  try {
    const result = await sql`SELECT * FROM hero_content LIMIT 1`;
    if (result.length > 0) {
      heroData = result[0];
    } else {
      // Table exists but is empty
      tableExists = false; 
    }
  } catch (error) {
    tableExists = false;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans bg-bg text-fg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-primary">Content Management System</h1>
        <form action={logout}>
          <button type="submit" className="px-4 py-2 text-sm bg-fg/10 hover:bg-fg/20 text-fg rounded transition">
            Logout
          </button>
        </form>
      </div>
      
      {!tableExists || !heroData ? (
        <div className="bg-accent/10 border border-accent/30 text-fg p-6 rounded-xl shadow-sm mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-heading font-semibold mb-2 text-accent">Hero Database is missing or empty!</h2>
          <p className="mb-4 text-muted">Click the button below to safely create the <code className="bg-fg/10 px-1.5 py-0.5 rounded text-fg">hero_content</code> table and insert default values.</p>
          <form action={initTable}>
            <button type="submit" className="px-5 py-2.5 bg-accent hover:opacity-90 text-bg rounded-lg shadow transition font-medium">
              Initialize Database Table
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <section className="bg-fg/5 border border-border p-6 rounded-xl shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Update Hero Section</h2>
            <HeroForm updateHero={updateHero} heroData={heroData} />
            <p className="text-xs text-muted mt-4">
              Last updated: {new Date(heroData.updated_at).toLocaleString()}
            </p>
          </section>
        </div>
      )}

      {tableExists && (
        <div className="mt-12 p-6 border border-accent/50 bg-accent/10 rounded-xl">
          <h3 className="text-accent font-heading font-semibold mb-2">Danger Zone</h3>
          <p className="text-fg text-sm mb-4">You can completely delete the hero table and all its data here. This will hide the Hero section on the homepage.</p>
          <form action={dropTable} className="flex flex-col gap-3">
            <label className="text-sm text-fg">
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
            <button type="submit" className="self-start px-4 py-2 bg-accent text-bg hover:opacity-90 rounded transition text-sm font-medium">
              Delete Table
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
