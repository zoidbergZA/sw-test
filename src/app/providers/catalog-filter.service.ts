import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Filters {
  movie?: string;
  species?: string;
  character?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogFilterService {

  filterState: Filters = {};
  filters$ = new BehaviorSubject<Filters>({});

  constructor() { }

  setMovieFilter(movieId: string | undefined) {
    this.filterState.movie = movieId;

    this.filters$.next(this.filterState);
  }

  setSpeciesFilter(speciesId: string | undefined) {
    this.filterState.species = speciesId;

    this.filters$.next(this.filterState);
  }

  setCharacterFilter(characterId: string | undefined) {
    this.filterState.character = characterId;

    this.filters$.next(this.filterState);
  }
}
