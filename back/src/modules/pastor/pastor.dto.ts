export interface GetPastorDTO {
  pastor_id: string;
}
export interface GetPastorResponseDTO {
  id: string;
  name: string;
  picturePath: string;
  hqCoordinates: [number, number];
}

export interface GetPastorEngagementsDTO {
  pastor_id: string;
  limit?: number;
  page?: number;
}
export interface EngagementResponseDTO {
  id: string;
  state: string;
  coordinates: [number, number];
  timestamp: string;
}
export interface GetPastorEngagementsResponseDTO {
  total: number;
  page: number;
  limit: number;
  engagements: EngagementResponseDTO[];
}