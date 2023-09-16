export interface Daw {
  id: number;
  name: string;
  description: string;
  website: string;
  image: string;
  features: string[];
  price: string;
  famousSongs: string[];
}

export type DawContextType = {
  daws: Daw[];
  addDaw: (daw: Daw) => void;
  updateDaw: (daw: Daw) => void;
};


