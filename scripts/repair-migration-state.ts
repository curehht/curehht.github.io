/**
 * One-time repair: removes the last 4 applied migration records so that
 * 0005–0008 can re-run. Use only when the DB has migration state for 0005/0006
 * but the "documents" table was never created (e.g. relation "documents" does not exist).
 *
 * WARNING: Deletion is by row id (last 4), not by migration index. If your
 * __drizzle_migrations rows are not in journal order, this can remove the wrong
 * records and cause re-runs of 0003, 0004, etc. Migrations 0003–0007 have been
 * made idempotent (IF NOT EXISTS / conditional constraints) so re-running them
 * is safe.
 *
 * Run: pnpm run migration:repair-state
 * Then: pnpm run migration:migrate
 */
import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config({ path: '.env.local' })

const url = process.env.POSTGRES_URL
if (!url) {
  console.error('POSTGRES_URL is not set in .env.local')
  process.exit(1)
}

async function main() {
  const client = new Client({ connectionString: url })
  await client.connect()

  try {
    // Resolve migrations table (drizzle schema by default, else public)
    const { rows: found } = await client.query<{ schema: string }>(
      `SELECT table_schema AS schema FROM information_schema.tables WHERE table_name = '__drizzle_migrations' LIMIT 1`
    )
    const schema = found[0]?.schema ?? 'public'
    const table = `"${schema}"."__drizzle_migrations"`
    const res = await client.query(
      `DELETE FROM ${table} WHERE id IN (SELECT id FROM ${table} ORDER BY id DESC LIMIT 4) RETURNING id`
    )
    const deleted = res.rowCount ?? 0
    console.log(`Removed ${deleted} migration record(s). Run: pnpm run migration:migrate`)
  } finally {
    await client.end()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
