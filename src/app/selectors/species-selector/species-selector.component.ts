import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import gql from 'graphql-tag';
import { Species } from 'shared/types';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'species-selector',
  templateUrl: './species-selector.component.html',
  styleUrls: ['./species-selector.component.scss']
})
export class SpeciesSelectorComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  private _movieFilter: string | undefined;

  get movieFilter() {
    return this._movieFilter;
  }

  @Input()
  set movieFilter(val: string | undefined) {
    this._movieFilter = val;

    console.log(`handle movie filter changed: ${this.movieFilter}`);
  }

  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();

  species: Species[];
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
        this.species = result.data && (result.data as any).species as Species[];
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  onSelectionChange(event: any) {
    this.selected.emit(event.value);
  }
}
