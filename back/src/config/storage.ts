import knex, { Knex } from 'knex';

import variables from './variables';
import knexConfig from '../knexfile';
import { seed as seedPastors } from '../seeds/01_pastors_seed';
import { seed as seedEngagements } from '../seeds/02_engagements_seed';

let database: Knex | null;

export async function initializeDatabase(): Promise<Knex> {
  if (!database) {
    database = knex(knexConfig[variables.env]);

		// This is done here (instead of using an NPM script) because the DB is an in-memory SQLite running within the Node process
		await migrateDatabase();
		await seedDatabase();
	}

	return database;
}

export async function migrateDatabase(): Promise<void> {
	if (database) {
		try {
			await database.migrate.latest();
			console.log('Database migrated successfully');
		} catch (error) {
			console.error('Error migrating database:', error);
		}
	}
}

export async function seedDatabase(): Promise<void> {
	if (database) {
		try {
			await seedPastors(database);
			await seedEngagements(database);
			console.log('Database seeded successfully');
		} catch (error) {
			console.error('Error seeding database:', error);
		}
	}
}

export function getDatabase(): Knex {
  if (!database) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return database;
}

export async function closeDatabase(): Promise<void> {
  if (database) {
    await database.destroy();
    database = null;
  }
}

export default getDatabase;