import { Component, OnInit } from '@angular/core';
import { switchMap, filter, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Species } from 'shared/types';
import { Apollo } from 'apollo-angular';
import { CatalogFilterService, Filters } from 'src/app/providers/catalog-filter.service';

@Component({
  selector: 'species-selector',
  templateUrl: './species-selector.component.html',
  styleUrls: ['./species-selector.component.scss']
})
export class SpeciesSelectorComponent implements OnInit {
  species: Species[];
  loading = false;
  errors: any;

  query = gql`
    query Species($filter: SpeciesFilter) {
      species(filter: $filter) {
        id,
        name
      }
    }
  `;

  constructor(private apollo: Apollo, private filterService: CatalogFilterService) {}

  ngOnInit() {
    this.filterService.filters$.pipe(
      tap(f => {
        if (!f.movie) {
          this.species = undefined;
        }
      }),
      filter(f => f.movie !== undefined),
      tap(_ => this.loading = true),
      switchMap(filters => this.getSpeciesObservable(filters)
    )).subscribe(result => {
      this.species = result.data && (result.data as any).species as Species[];
      this.loading = result.loading;
      this.errors  = result.errors;
    });
  }

  onSelectionChange(event: any) {
    this.filterService.setSpeciesFilter(event.value);
  }

  getSpeciesObservable(filters: Filters) {
    return this.apollo
      .watchQuery({
        query: this.query,
        variables: {
          filter: {
            films_some: filters.movie
          }
        }
      }).valueChanges;
  }
}
