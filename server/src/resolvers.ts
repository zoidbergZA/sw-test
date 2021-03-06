import { ApolloError } from 'apollo-server';
import { Film, Species, Character, CharacterFilter, SpeciesFilter } from '../../shared/types';
import * as axios from 'axios';

const gis = require('g-i-s');
const swapiUrl = 'https://swapi.graph.cool/';
const characterImageCache = new Map<string, string>();

export const resolvers = {
  Query: {
    async films() {
      try {
        const query = `query {
          allFilms {
            id,
            title
          }
        }`;

        const data = await sendSwapiQuery(query);

        return data.allFilms.map((f: any) => f as Film);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async species(_: null, args: any) {
      try {
        const query = `query {
          allSpecies {
            id,
            name,
            films {
              id,
              title
            }
          }
        }`;

        const data        = await sendSwapiQuery(query);
        const allSpecies  = data.allSpecies.map((s: any) => s as Species);
        const filter      = args.filter as SpeciesFilter;

        return filterSpecies(allSpecies, filter);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async characters(_: null, args: any) {
      try {
        const query = `query {
          allPersons {
            id,
            name,
            birthYear,
            height,
            mass,
            homeworld {
              id,
              name
            }
            films {
              id,
              title
            },
            species {
              id,
              name
            }
          }
        }`;

        const data          = await sendSwapiQuery(query);
        const allCharacters = data.allPersons.map((p: any) => p as Character);
        const filter        = args.filter as CharacterFilter;
        const matches       = filterCharacters(allCharacters, filter);
        const result        = await Promise.all(matches.map(c => assignCharacterImage(c)));

        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}

async function sendSwapiQuery(query: string): Promise<any> {
  const body = {
    query
  };

  const response = await axios.default.post(swapiUrl, body);
  return response.data.data;
}

function filterSpecies(species: Species[], filter?: SpeciesFilter): Species[] {
  if (!filter) {
    return species;
  }

  let matches = species;

  if (filter.films_some) {
    matches = matches.filter(s => s.films.some(f => f.id === filter.films_some));
  }

  return matches;
}

function filterCharacters(characters: Character[], filter?: CharacterFilter): Character[] {
  if (!filter) {
    return characters;
  }

  let matches = characters;

  if (filter.id) {
    matches = matches.filter(c => c.id === filter.id);
  }

  if (filter.films_some) {
    matches = matches.filter(c => c.films.some(f => f.id === filter.films_some));
  }

  if (filter.species_some) {
    matches = matches.filter(c => c.species.some(s => s.id === filter.species_some));
  }

  return matches;
}

async function assignCharacterImage(character: Character): Promise<Character> {
  if (characterImageCache.has(character.id)) {
    character.image = characterImageCache.get(character.id);
    return character;
  }

  return new Promise<Character>((resolve, reject) => {
    gis(`star wars character ${character.name}`, (error: any, results: any) => {
      if (error) {
        console.log(error);
      }
      else {
        const img = results[0].url;
        character.image = img;
        characterImageCache.set(character.id, img);
      }
      resolve(character);
    });
  });
}
