import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { Joke } from '../../../shared/models';

@Component({
  selector: 'gid-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteListComponent {

  @Input() favorites: Joke[];
  @Output() remove = new EventEmitter<Joke>();

  onRemove(joke: Joke) {
    this.remove.emit(joke);
  }
}
