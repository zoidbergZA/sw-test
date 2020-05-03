import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Film } from 'shared/types';
import { CatalogFilterService } from 'src/app/providers/catalog-filter.service';

@Component({
  selector: 'movie-selector',
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.scss']
})
export class MovieSelectorComponent implements OnInit {
  films: Film[];
  loading = true;
  errors: any;

  constructor(private apollo: Apollo, private filterService: CatalogFilterService) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            films {
              id,
              title
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.films = result.data && (result.data as any).films as Film[];
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  onSelectionChange(event: any) {
    this.filterService.setMovieFilter(event.value);
  }
}
