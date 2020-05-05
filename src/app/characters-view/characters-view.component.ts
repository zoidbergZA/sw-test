import { Component, OnInit } from '@angular/core';
import { Character } from 'shared/types';
import { switchMap, filter, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { CatalogFilterService, Filters } from 'src/app/providers/catalog-filter.service';

@Component({
  selector: 'characters-view',
  templateUrl: './characters-view.component.html',
  styleUrls: ['./characters-view.component.scss']
})
export class CharactersViewComponent implements OnInit {
  characters: Character[];
  loading = false;
  errors: any;

  query = gql`
    query Characters($filter: CharacterFilter) {
      characters(filter: $filter) {
        id,
        name,
        image,
        birthYear,
        films {
          id,
          title
        },
        mass,
        height,
        homeworld {
          id,
          name
        }
      }
    }
  `;

  constructor(private apollo: Apollo, private filterService: CatalogFilterService) {}

  ngOnInit() {
    this.filterService.filters$.pipe(
      filter(f => f.movie !== undefined),
      tap(_ => this.loading = true),
      switchMap(filters => this.getCharactersObservable(filters)
    )).subscribe(result => {
      this.characters = result.data && (result.data as any).characters as Character[];
      this.loading = result.loading;
      this.errors  = result.errors;
    });
  }

  getCharactersObservable(filters: Filters) {
    return this.apollo
      .watchQuery({
        query: this.query,
        variables: {
          filter: {
            films_some: filters.movie,
            species_some: filters.species,
            id: filters.character
          }
        }
      }).valueChanges;
  }
}
