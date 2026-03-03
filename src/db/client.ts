/**
 * Shared DB client: uses node-postgres (pg) for local Postgres (localhost),
 * and Neon serverless (HTTP) for remote (Vercel/Neon).
 * This avoids connecting to remote instances when using Docker Postgres locally.
 */
import { Pool } from 'pg'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'

const url = process.env.POSTGRES_URL ?? ''
const isLocalPostgres =
  url.includes('localhost') || url.includes('127.0.0.1')

export const db = isLocalPostgres
  ? drizzleNode(new Pool({ connectionString: url }))
  : drizzleNeon(url)
