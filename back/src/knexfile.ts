import type { Knex } from 'knex';

interface KnexConfig {
	[key: string]: Knex.Config;
};

const config: KnexConfig = {
	development: {
		client: 'better-sqlite3',
		connection: {
			filename: ':memory:'
		},
		migrations: {
			directory: './src/migrations'
		},
		useNullAsDefault: true
	},
	test: {
		client: 'better-sqlite3',
		connection: {
			filename: ':memory:'
		},
		migrations: {
			directory: './src/migrations'
		},
		pool: { min: 1, max: 1 },
		useNullAsDefault: true
	},
};

export default config;