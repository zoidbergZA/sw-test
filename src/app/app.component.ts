import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedMovie: string | undefined;

  onMovieSelected(movieId: string) {
    console.log(`movie selected: ${movieId}`);
    this.selectedMovie = movieId;
  }
}
