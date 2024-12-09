import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('user_id', 'integer', (col) => col.generatedByDefaultAsIdentity().primaryKey())
    .addColumn('user_full_name', 'text')
    .addColumn('user_email', 'text')
    .addColumn('user_encrypted_password', 'text')
    .addColumn('user_created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('user_updated_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute()
}
