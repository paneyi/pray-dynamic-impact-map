export interface Engagement {
  id: string;
  pastorId: string;
  state: string;
  coordinates: [number, number];
	timestamp: string;
}

export interface EngagementDB {
  id: string;
  pastor_id: string;
  state: string;
  coordinates: string;
	timestamp: string;
}