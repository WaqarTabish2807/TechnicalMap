import { createPool } from "@vercel/postgres";

// On Vercel the Neon integration exposes its connection string with a TTM_
// prefix; POSTGRES_URL there still belongs to the old Supabase integration.
// Locally, .env sets POSTGRES_URL to Neon.
const pool = createPool({
  connectionString: process.env.TTM_POSTGRES_URL ?? process.env.POSTGRES_URL,
});

export const sql = pool.sql.bind(pool);
