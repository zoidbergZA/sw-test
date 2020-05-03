export interface Film {
  id: string;
  title: string;
}

export interface Species {
  id: string;
  name: string;
  films: Film[];
}

export interface SpeciesFilter {
  films_some?: string;
}

export interface Character {
  id: string;
  name: string;
  image?: string;
  films: Film[];
  species: Species[];
}

export interface CharacterFilter {
  id?: string;
  films_some?: string;
  species_some?: string;
}
