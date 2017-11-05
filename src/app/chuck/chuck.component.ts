import { Component, OnInit } from '@angular/core';

// Models
import { Joke } from '../shared/models';

@Component({
  selector: 'gid-chuck',
  template: `
    <div class="container">
      <gid-joke-list [jokes]="jokes"></gid-joke-list>
      <gid-favorite-list [favorites]="jokes"></gid-favorite-list>
    </div>
  `,
  styleUrls: ['./chuck.component.scss']
})
export class ChuckComponent {
  jokes: Joke[] = [
    { id: 1, text: 'Hallo, dit is een joke', favorite: false },
  ];
}
