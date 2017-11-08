import { Injectable, Optional } from '@angular/core';

// Libs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mergeMap';

// Models
import { Joke } from '../../shared/models';
import { JokeAction } from '../../shared/models';

@Injectable()
export class JokeService {

  readonly jokes$ = new BehaviorSubject<Joke[]>([]);

  private _jokes$ = new Subject<Joke[]>();
  private _update$ = new Subject<JokeAction>();
  private _add$ = new Subject<Joke>();
  private _remove$ = new Subject<Joke>();
  private _toggle$ = new Subject<Joke>();

  constructor(private favoriteLimit = Number.MAX_VALUE) {

    this._jokes$
      .subscribe(this.jokes$);

    this._update$
      .scan(this._execute, [])
      .subscribe(this._jokes$);

    this._add$
      .map(joke => this._addAction(joke))
      .subscribe(this._update$);

    this._remove$
      .map(joke => this._removeAction(joke))
      .subscribe(this._update$);

    this._toggle$
      .map(joke => joke.favorite ? this._unfavoriteAction(joke) : this._favoriteAction(joke))
      .subscribe(this._update$);
  }

  add(joke: Joke): void {
    this._add$.next(joke);
  }

  remove(joke: Joke): void {
    this._remove$.next(joke);
  }

  toggleFavorite(joke: Joke): void {
    this._toggle$.next(joke);
  }

  private _execute(jokes: Joke[], action: JokeAction): Joke[] {
    return action(jokes);
  }

  private _addAction(joke: Joke): JokeAction {
    return (state: Joke[]) => state.indexOf(joke) === -1 ? [...state, joke] : state;
  }

  private _removeAction(joke: Joke): JokeAction {
    return (state: Joke[]) => {
      const index = state.indexOf(joke);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    };
  }

  private _favoriteAction(joke: Joke): JokeAction {
    return (state: Joke[]) => state.map(item => {
      if (item.id === joke.id) {
        if (this.jokes$.getValue().filter(x => x.favorite).length < this.favoriteLimit) {
          return { ...item, favorite: true };
        }
      }
      return item;
    });
  }

  private _unfavoriteAction(joke: Joke): JokeAction {
    return(state: Joke[]) => state.map(item => {
      return item.id === joke.id ? { ...item, favorite: false } : item;
    });
  }

}
