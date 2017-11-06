import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { Joke } from '../../../shared/models';

@Component({
  selector: 'gid-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeListComponent {

  @Input() jokes: Joke[];
  @Output() favorite = new EventEmitter<Joke>();
  @Output() refresh = new EventEmitter<void>();

  onFavorite(joke: Joke) {
    this.favorite.emit(joke);
  }

  onRefresh() {
    this.refresh.emit();
  }
}
