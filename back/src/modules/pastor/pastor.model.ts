export interface Pastor {
  id: string;
  name: string;
  picturePath: string;
  hqCoordinates: [number, number];
}

export interface PastorDB {
  id: string;
  name: string;
  picture_path: string;
  hq_coordinates: string;
}