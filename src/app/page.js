import HomeClient from './HomeClient';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vencent Domingo | Home',
  description: 'This is the home page for the Vencent Domingo Portfolio website',
};

export default async function Page() {
  let heroData = null;

  try {
    const result = await sql`SELECT * FROM hero_content LIMIT 1`;
    if (result.length > 0) {
      heroData = result[0];
    } else {
      console.log('[Home Page Warning]: The hero_content table exists but has no data. Please visit /content-management to initialize it.');
    }
  } catch (error) {
    console.log('[Home Page Warning]: Failed to fetch hero_content from Neon DB. The table might not exist or the database is down. Error:', error.message);
  }

  return <HomeClient heroData={heroData} />
}
