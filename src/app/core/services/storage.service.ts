import { Injectable } from '@angular/core';

// Libs
import { Observable } from 'rxjs/Observable';

// Models
import { Joke } from '../../shared/models';

@Injectable()
export class StorageService {

  private FAVORITES_KEY = 'favorites';

  getFavorites(): Joke[] {
    return JSON.parse(this.getItem(this.FAVORITES_KEY));
  }

  storeFavorites(favorites: Joke[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  private getItem(key: string): string {
    return localStorage.getItem(key) || '[]';
  }

}
