import { fetchData } from "./api.service"; // Reusable API client

export interface PastorResponse {
  id: string;
  name: string;
  picturePath: string;
  hqCoordinates: [number, number];
}

export interface Engagement {
  id: string;
  state: string;
  coordinates: [number, number];
  timestamp: string;
}

interface EngagementResponse {
  engagements: Engagement[];
	total: number;
  page: number;
  limit: number;
}

export const getPastor = async (pastorId: string): Promise<PastorResponse> => 
  fetchData<PastorResponse>(`/pastors/${pastorId}`);

export const getEngagements = async (pastorId: string, page = 1, limit = 300): Promise<EngagementResponse> =>
  fetchData<EngagementResponse>(`/pastors/${pastorId}/impact-map?page=${page}&limit=${limit}`);