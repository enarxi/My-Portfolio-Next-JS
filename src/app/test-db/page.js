import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import MessageForm from './MessageForm';

export const dynamic = 'force-dynamic';

// --- SERVER ACTIONS ---

// Action to handle login
async function login(formData) {
  'use server'
  const password = formData.get('password');
  
  // We check against the ADMIN_PASSWORD environment variable
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

// Action to create the table if it doesn't exist yet
async function initTable() {
  'use server'
  await sql`
    CREATE TABLE IF NOT EXISTS demo_messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  revalidatePath('/test-db');
}

// Action to drop the table entirely
async function dropTable(formData) {
  'use server'
  const confirmation = formData.get('confirmation');
  if (confirmation !== 'Delete demo table') {
    return;
  }
  
  await sql`DROP TABLE IF EXISTS demo_messages`;
  revalidatePath('/test-db');
}

// Action to add a new message (CREATE)
async function addMessage(formData) {
  'use server'
  const content = formData.get('content');
  if (!content) return;
  
  await sql`INSERT INTO demo_messages (content) VALUES (${content})`;
  revalidatePath('/test-db');
}

// Action to delete a message (DELETE)
async function deleteMessage(formData) {
  'use server'
  const id = formData.get('id');
  if (!id) return;

  await sql`DELETE FROM demo_messages WHERE id = ${id}`;
  revalidatePath('/test-db');
}


// --- SERVER COMPONENT ---

export default async function TestDB() {
  // 1. Check Authentication
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true';

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-24 p-8 font-sans bg-bg border border-border rounded-xl shadow-sm text-fg">
        <h1 className="text-2xl font-heading font-bold mb-4 text-primary">Admin Access Required</h1>
        <p className="text-muted mb-6 text-sm">Please enter the admin password to access the database test page.</p>
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
  let messages = [];
  let tableExists = true;

  try {
    messages = await sql`SELECT * FROM demo_messages ORDER BY created_at DESC`;
  } catch (error) {
    tableExists = false;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans bg-bg text-fg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-primary">Neon DB Connection Test</h1>
        <form action={logout}>
          <button type="submit" className="px-4 py-2 text-sm bg-fg/10 hover:bg-fg/20 text-fg rounded transition">
            Logout
          </button>
        </form>
      </div>
      
      {!tableExists ? (
        <div className="bg-accent/10 border border-accent/30 text-fg p-6 rounded-xl shadow-sm mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-heading font-semibold mb-2 text-accent">Database is connected, but the table is missing!</h2>
          <p className="mb-4 text-muted">Click the button below to safely create the <code className="bg-fg/10 px-1.5 py-0.5 rounded text-fg">demo_messages</code> table in your Neon database.</p>
          <form action={initTable}>
            <button type="submit" className="px-5 py-2.5 bg-accent hover:opacity-90 text-bg rounded-lg shadow transition font-medium">
              Initialize Database Table
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
          <section className="bg-fg/5 border border-border p-6 rounded-xl shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-heading font-semibold mb-4 text-primary">1. Create Entry</h2>
            <MessageForm addMessage={addMessage} />
          </section>

          <section className="bg-fg/5 border border-border p-6 rounded-xl shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-heading font-semibold mb-4 text-primary">2. Read & Delete Entries</h2>
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {messages.length === 0 ? (
                <p className="text-muted italic p-4 bg-bg rounded-lg border border-border text-center">No messages yet. Add one!</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-bg border border-border p-4 rounded-lg shadow-sm flex justify-between items-start gap-4 hover:border-fg/30 transition">
                    <div>
                      <p className="text-fg break-words">{msg.content}</p>
                      <p className="text-xs text-muted mt-2">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button type="submit" className="text-accent hover:opacity-70 hover:bg-accent/10 p-2 rounded transition" title="Delete entry">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </form>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}

      {tableExists && (
        <div className="mt-12 p-6 border border-accent/50 bg-accent/10 rounded-xl">
          <h3 className="text-accent font-heading font-semibold mb-2">Danger Zone</h3>
          <p className="text-fg text-sm mb-4">Done testing? You can completely delete the table and all its data here.</p>
          <form action={dropTable} className="flex flex-col gap-3">
            <label className="text-sm text-fg">
              Type <strong className="text-accent select-all">Delete demo table</strong> below to confirm:
            </label>
            <input 
              type="text" 
              name="confirmation" 
              required
              pattern="Delete demo table"
              title="Please type exactly: Delete demo table"
              className="w-1/2 md:w-full p-2 bg-bg border border-accent/50 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-fg placeholder:text-muted"
              placeholder="Delete demo table"
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
