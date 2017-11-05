import { Component, Input } from '@angular/core';

// Models
import { Joke } from '../../../shared/models';

@Component({
  selector: 'gid-favorite-list',
  template: `
    <mat-card>

      <mat-card-title>Favorites</mat-card-title>

      <mat-card-content>
        <mat-selection-list>
          <mat-list-option *ngFor="let joke of favorites">{{ joke.text }}</mat-list-option>
        </mat-selection-list>
      </mat-card-content>

      <mat-card-actions>
        <button mat-raised-button>Refresh</button>
      </mat-card-actions>

    </mat-card>
  `
})
export class FavoriteListComponent {
  @Input() favorites: Joke[];
}
