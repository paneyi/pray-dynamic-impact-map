import type { Knex } from "knex";

const TABLE_NAME = 'engagement';

export async function up(knex: Knex): Promise<void> {
	const exists = await knex.schema.hasTable(TABLE_NAME);
	if (!exists) {
		await knex.schema.createTable(TABLE_NAME, function (table) {
			table
				.uuid('id')
				.primary()
				.defaultTo(knex.fn.uuid());
			table
				.uuid('pastor_id')
				.references('id')
				.inTable('pastor')
				.onDelete('CASCADE')
				.notNullable();
			table
				.string('state')
				.notNullable();
			table
				.specificType("coordinates", "TEXT")
				.notNullable();
			table
				.timestamp('timestamp')
				.notNullable();
			table
				.timestamp('created_at')
				.defaultTo(knex.fn.now());
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable(TABLE_NAME);
}