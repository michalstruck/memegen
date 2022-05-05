export interface MemeTypes {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: 2;
}
export interface APIResTypes {
  data: { memes: MemeTypes[] };
  success: boolean;
}
