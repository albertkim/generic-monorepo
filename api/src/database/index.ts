import { promises as fs } from 'fs'
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from 'kysely'
import path from 'path'
import pg from 'pg'
import { fileURLToPath } from 'url'
import { DB } from './DatabaseModels.js'
const { Pool } = pg

const NODE_ENV: string | undefined = process.env.NODE_ENV
let DATABASE_HOST: string | undefined = process.env.DATABASE_HOST
let DATABASE_PORT: string | undefined = process.env.DATABASE_PORT
let DATABASE_USER: string | undefined = process.env.DATABASE_USER
let DATABASE_PASSWORD: string | undefined = process.env.DATABASE_PASSWORD
let DATABASE_NAME: string | undefined = process.env.DATABASE_NAME

// Explicitly use local lumber_test database for testing, make sure we don't use production database by accident
// Just need to make sure that NODE_ENV is set to 'test' when running tests
if (NODE_ENV === 'test') {
  DATABASE_HOST = 'localhost'
  DATABASE_PORT = '5432'
  DATABASE_USER = 'postgres'
  DATABASE_PASSWORD = undefined
  DATABASE_NAME = 'lumber_test'
}

// Password is optional because it's not required for local development
if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_USER || !DATABASE_NAME) {
  throw new Error('DATABASE_HOST, DATABASE_PORT, DATABASE_USER, and DATABASE_NAME must be set')
}

export const config = {
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  user: DATABASE_USER,
  password: DATABASE_PASSWORD
}

export const dialect = new PostgresDialect({
  pool: new Pool(config)
})

export const db = new Kysely<DB>({ dialect })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const migrationFolder = path.resolve(__dirname, '../migrations')
console.log(`Migration folder: ${migrationFolder}`)

export const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder
  })
})
