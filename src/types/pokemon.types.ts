export interface Pokemon {
  name: string;
  url?: string;
  id?: number;
  height?: number;
  weight?: number;
  types?: { type: { name: string } }[];
}
