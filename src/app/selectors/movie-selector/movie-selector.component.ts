import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Film } from 'shared/types';

@Component({
  selector: 'movie-selector',
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.scss']
})
export class MovieSelectorComponent implements OnInit {

  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();

  films: Film[];
  loading = true;
  errors: any;

  constructor(private apollo: Apollo) {}

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
    this.selected.emit(event.value);
  }
}
