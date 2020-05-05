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
  birthYear?: string;
  mass?: number;
  height?: number;
  films: Film[];
  species: Species[];
  homeworld?: Planet;
  image?: string;
}

export interface Planet {
  id: string;
  name: string;
}

export interface CharacterFilter {
  id?: string;
  films_some?: string;
  species_some?: string;
}
