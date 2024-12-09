import { sql } from 'kysely'
import { beforeAll } from 'vitest'
import { config, db, migrator } from '../src/database'

beforeAll(async () => {
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`)

  // Make sure we're running the tests with the test environment
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Tests must be run with the test environment')
  }

  // Confirm that the database name is lumber_test to make sure we're not accidentally using the production database
  if (config.database !== 'lumber_test') {
    throw new Error('Tests must be run with the lumber_test database')
  } else {
    console.log('Tests are correctly running with the lumber_test database')
  }

  // Clear the test database
  console.log('Clearing public schema')
  await sql`DROP SCHEMA IF EXISTS public CASCADE`.execute(db)
  console.log('Creating public schema')
  await sql`CREATE SCHEMA public`.execute(db)

  // Run migrations
  console.log('Running migrations')
  const { error, results } = await migrator.migrateToLatest()
  console.log(results)
  if (error) {
    console.error(error)
    throw error
  }

  // Insert mock user data
  console.log('Inserting mock user data')

  await db
    .insertInto('users')
    .values([
      {
        user_id: 1,
        user_full_name: 'User 1',
        user_email: 'user1@test.com'
      },
      {
        user_id: 2,
        user_full_name: 'User 2',
        user_email: 'user2@test.com'
      },
      {
        user_id: 3,
        user_full_name: 'User 3',
        user_email: 'user3@test.com'
      }
    ])
    .execute()

  console.log('Mock user data inserted')
  console.log('Setup complete')
})
