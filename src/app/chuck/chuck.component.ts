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
import { StorageService } from '../core/services';

@Component({
  selector: 'gid-chuck',
  template: `
    <div class="container">

      <gid-joke-list
        [jokes]="jokes$ | async"
        (favorite)="handleFavorite($event)"
        (refresh)="handleRefresh()">
      </gid-joke-list>

      <gid-favorite-list
        [favorites]="favorites$ | async"
        (remove)="handleFavorite($event)">
      </gid-favorite-list>

    </div>
  `,
  styleUrls: ['./chuck.component.scss']
})
export class ChuckComponent implements OnInit {

  favorites$ = new Subject<Joke[]>();
  jokes$ = new Subject<Joke[]>();

  constructor(
    public apiService: ApiService,
    public jokeService: JokeService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {

    // Add all jokes to jokeService on api refresh
    this.apiService.jokes$
      .mergeMap(jokes => Observable.from(jokes))
      .subscribe(joke => this.jokeService.add(joke));

    // Grab only the un-favorited jokes
    this.jokeService.jokes$
      .map(jokes => jokes.filter(joke => !joke.favorite))
      .subscribe(this.jokes$);

    // Grab only the favorite jokes
    this.jokeService.jokes$
      .map(jokes => jokes.filter(joke => joke.favorite))
      .subscribe(this.favorites$);

    // Persist favorites every update
    this.favorites$
      .subscribe(favs => this.storageService.storeFavorites(favs));

    // TODO: Changedetection is not working for FavoritesComponent, though the favorites$ observable does updates correctly
    // Load persisted favorites on init
    Observable
      .from(this.storageService.getFavorites())
      .subscribe(joke => this.jokeService.add(joke));
  }

  handleFavorite(joke: Joke) {
    this.jokeService.toggleFavorite(joke);
  }

  handleRefresh() {
    this.apiService.refresh();
  }
}
