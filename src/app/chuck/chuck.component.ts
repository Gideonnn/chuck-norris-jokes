import { Component, OnInit } from '@angular/core';

// Libs
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

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
        (refresh)="handleRefresh()"
        (timer)="handleTimer()">
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

  private autoFavoriteSub: Subscription;

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

  handleTimer() {
    if (!this.autoFavoriteSub || this.autoFavoriteSub.closed) {
      const jokes = this.jokeService.jokes$.getValue().filter(fav => !fav.favorite);
      this.autoFavoriteSub = Observable
        .timer(0, 1000)
        .take(jokes.length)
        .map(i => jokes[i])
        .subscribe(joke => this.jokeService.toggleFavorite(joke));
    } else {
      this.autoFavoriteSub.unsubscribe();
    }
  }
}
