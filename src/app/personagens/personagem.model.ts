export interface Personagem {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  type?: string;
  gender?: string;
  origin?: { name: string; url: string };
  location?: { name: string; url: string };
  episode?: string[];
  url?: string;
  created?: string;
}
