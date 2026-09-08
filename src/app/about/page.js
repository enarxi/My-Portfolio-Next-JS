import { sql } from '@/lib/db';
import ClientPage from './ClientPage'

export const metadata = {
  title: 'Vencent Domingo | About me',
  description: 'This is about me page for my portfolio website.',
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  let aboutData = null;
  try {
    const result = await sql`SELECT * FROM about_content LIMIT 1`;
    if (result.length > 0) {
      aboutData = result[0];
    }
  } catch (error) {
    console.error("Failed to fetch about data:", error);
  }

  return <ClientPage aboutData={aboutData} />
}
