import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Libs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

// Models
import { Joke } from '../../shared/models';
import { JokeAction } from '../../shared/models';

interface ApiJoke {
  id: number;
  joke: string;
  categories: string[];
}

interface ApiResponse {
  type: string;
  value: ApiJoke[];
}

@Injectable()
export class ApiService {

  readonly jokes$ = new BehaviorSubject<Joke[]>([]);

  constructor(private http: HttpClient) { }

  refresh(): void {
    this.http
      .get<ApiResponse>('http://api.icndb.com/jokes/random/10')
      .map(res => res.value)
      .map(apiJokes => apiJokes.map(this.toJoke))
      .subscribe(jokes => this.jokes$.next(jokes));
  }

  private toJoke(apiJoke: ApiJoke): Joke {
    return {
      id: apiJoke.id,
      text: apiJoke.joke,
      favorite: false,
    } as Joke;
  }

}
