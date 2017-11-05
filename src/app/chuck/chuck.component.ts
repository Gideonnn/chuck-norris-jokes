import { Component, OnInit } from '@angular/core';

// Models
import { Joke } from '../shared/models';

@Component({
  selector: 'gid-chuck',
  template: `
    <gid-joke-list [jokes]="jokes"></gid-joke-list>
    <gid-favorite-list [favorites]="jokes"></gid-favorite-list>
  `,
})
export class ChuckComponent {
  jokes: Joke[] = [
    { id: 1, text: 'Hallo, dit is een joke', favorite: false },
  ];
}
