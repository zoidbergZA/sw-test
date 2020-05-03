import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  films: any[];
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
        this.films = result.data && (result.data as any).films;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }
}
