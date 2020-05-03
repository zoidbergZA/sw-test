import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onMovieSelected(movieId: string) {
    console.log(`movie selected: ${movieId}`);
  }
}
