import { Component, Input } from '@angular/core';

// Models
import { Joke } from '../../../shared/models';

@Component({
  selector: 'gid-joke-list',
  template: `
    <mat-card>

      <mat-card-title>Jokes</mat-card-title>

      <mat-card-content>
        <mat-selection-list>
          <mat-list-option *ngFor="let joke of jokes">{{ joke.text }}</mat-list-option>
        </mat-selection-list>
      </mat-card-content>

      <mat-card-actions>
        <button mat-raised-button>Refresh</button>
      </mat-card-actions>

    </mat-card>
  `
})
export class JokeListComponent {
  @Input() jokes: Joke[];
}
