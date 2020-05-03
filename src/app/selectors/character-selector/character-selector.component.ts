import { Component, OnInit } from '@angular/core';
import { Character } from 'shared/types';
import { switchMap, filter, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { CatalogFilterService, Filters } from 'src/app/providers/catalog-filter.service';

@Component({
  selector: 'character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss']
})
export class CharacterSelectorComponent implements OnInit {
  characters: Character[];
  loading = false;
  errors: any;

  query = gql`
    query Characters($filter: CharacterFilter) {
      characters(filter: $filter) {
        id,
        name
      }
    }
  `;

  constructor(private apollo: Apollo, private filterService: CatalogFilterService) {}

  ngOnInit() {
    this.filterService.filters$.pipe(
      tap(f => {
        if (!f.movie || !f.species) {
          this.characters = undefined;
        }
      }),
      filter(f => f.movie !== undefined && f.species !== undefined),
      tap(_ => this.loading = true),
      switchMap(filters => this.getCharactersObservable(filters)
    )).subscribe(result => {
      console.log(result.data);
      this.characters = result.data && (result.data as any).characters as Character[];
      this.loading = result.loading;
      this.errors  = result.errors;
    });
  }

  onSelectionChange(event: any) {
    this.filterService.setCharacterFilter(event.value);
  }

  getCharactersObservable(filters: Filters) {
    return this.apollo
      .watchQuery({
        query: this.query,
        variables: {
          filter: {
            films_some: filters.movie,
            species_some: filters.species
          }
        }
      }).valueChanges;
  }
}
