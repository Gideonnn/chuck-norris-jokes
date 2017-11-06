import { Component, OnInit } from '@angular/core';

// Libs
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

// Models
import { Joke } from '../shared/models';

// Services
import { ApiService } from '../core/services';
import { JokeService } from '../core/services';

@Component({
  selector: 'gid-chuck',
  template: `
    <div class="container">

      <gid-joke-list
        [jokes]="jokeService.jokes$ | async"
        (favorite)="handleFavorite($event)"
        (refresh)="handleRefresh()">
      </gid-joke-list>

      <gid-favorite-list
        [favorites]="favorites$ | async"
        (remove)="handleRemoveFavorite($event)">
      </gid-favorite-list>

    </div>
  `,
  styleUrls: ['./chuck.component.scss']
})
export class ChuckComponent implements OnInit {

  favorites$ = new Subject<Joke[]>();

  constructor(
    public apiService: ApiService,
    public jokeService: JokeService,
  ) { }

  ngOnInit() {
    this.apiService.jokes$
      .mergeMap(jokes => Observable.from(jokes))
      .subscribe(joke => this.jokeService.add(joke));

    this.jokeService.jokes$
      .map(jokes => jokes.filter(joke => joke.favorite))
      .subscribe(this.favorites$);
  }

  handleFavorite(joke: Joke) {
    this.jokeService.toggleFavorite(joke);
  }

  handleRemoveFavorite(joke: Joke): void {
    this.jokeService.remove(joke);
  }

  handleRefresh() {
    this.apiService.refresh();
  }
}
