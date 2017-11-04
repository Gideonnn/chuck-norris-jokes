import { Injectable } from '@angular/core';

// Libs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

// Models
import { Joke } from '../../shared/models';
import { JokeAction } from '../../shared/models';

@Injectable()
export class JokeService {

  readonly jokes$ = new BehaviorSubject<Joke[]>([]);
  readonly favorites$ = new BehaviorSubject<Joke[]>([]);

  private _jokes$ = new Subject<Joke[]>();
  private _update$ = new Subject<JokeAction>();
  private _add$ = new Subject<Joke>();
  private _remove$ = new Subject<Joke>();
  private _toggle$ = new Subject<Joke>();

  constructor() {

    this._jokes$
      .subscribe(this.jokes$);

    this.jokes$
      .scan(jokes => jokes.filter(joke => joke.favorite), [])
      .subscribe(this.favorites$);

    this._update$
      .scan(this._execute, [])
      .subscribe(this._jokes$);

    this._add$
      .map(joke => this._addAction(joke));

    this._remove$
      .map(joke => this._removeAction(joke));

    this._toggle$
      .map(joke => this._toggleAction(joke));
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
    return (state: Joke[]) => [ ...state, joke ];
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

  private _toggleAction(joke: Joke): JokeAction {
    return (state: Joke[]) => state.map(item => {
      if (item.id === joke.id) {
        item.favorite = !item.favorite;
      }
      return item;
    });
  }

}
