/**
 * Shared DB client: uses node-postgres (pg) for local Postgres (localhost),
 * and @vercel/postgres for remote (Vercel/Neon/Supabase).
 * This avoids the "@vercel/postgres can only connect to remote instances" warning
 * when using Docker Postgres locally.
 */
import { Pool } from 'pg'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres'

const url = process.env.POSTGRES_URL ?? ''
const isLocalPostgres =
  url.includes('localhost') || url.includes('127.0.0.1')

export const db = isLocalPostgres
  ? drizzleNode(new Pool({ connectionString: url }))
  : drizzleVercel()
