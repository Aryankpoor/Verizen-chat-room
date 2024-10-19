import { neon } from '@neondatabase/serverless';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL must be a Neon postgres connection string')
}

export const getDBVersion = async() => {
    const sql = neon(process.env.NEON_DATABASE_URL!);
    const response = await sql`SELECT version()`;
    return { version: response[0].version }
}