import type { Knex } from 'knex';

import engagements from "../data/engagements";

const TABLE_NAME = 'engagement';

export async function seed(knex: Knex): Promise<void> {
	const formattedEngagements = engagements.map((engagement) => ({
    ...engagement,
		timestamp: new Date(engagement.timestamp).toISOString()
  }));

	await knex(TABLE_NAME).insert(formattedEngagements);
}