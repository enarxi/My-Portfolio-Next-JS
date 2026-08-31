import { neon } from '@neondatabase/serverless';

// This securely connects to your database using the DATABASE_URL 
// we just downloaded into .env.development.local
export const sql = neon(process.env.DATABASE_URL);
