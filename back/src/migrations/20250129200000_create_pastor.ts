import type { Knex } from "knex";

const TABLE_NAME = 'pastor';

export async function up(knex: Knex): Promise<void> {
	const exists = await knex.schema.hasTable(TABLE_NAME);
	if (!exists) {
		await knex.schema.createTable(TABLE_NAME, function (table) {
			table
				.uuid('id')
				.primary()
				.defaultTo(knex.fn.uuid());
			table
				.string('name')
				.notNullable();
			table
				.string('picture_path')
				.notNullable();
			table
				.specificType("hq_coordinates", "TEXT")
				.notNullable();
			table
				.timestamp('created_at')
				.defaultTo(knex.fn.now());
			table
				.timestamp('updated_at')
				.defaultTo(knex.fn.now());
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable(TABLE_NAME);
}