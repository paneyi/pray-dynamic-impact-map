import type { Knex } from 'knex';

const TABLE_NAME = 'pastor';

export async function seed(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert([
    {
			id: "d097d9dc-5be7-4430-898a-394f79f20cdd",
			name: "Bruno Panelli",
			picture_path: "/pastor.png",
			hq_coordinates: JSON.stringify([-119.4179, 36.7783])
		}
  ]);
}