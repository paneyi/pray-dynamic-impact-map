import { closeDatabase, initializeDatabase, migrateDatabase, seedDatabase } from "../src/config/storage";

beforeAll(async () => {
	await initializeDatabase();
});

afterAll(async () => {
  await closeDatabase();
});