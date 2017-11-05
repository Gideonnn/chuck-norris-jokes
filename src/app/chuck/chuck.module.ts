import { NgModule } from '@angular/core';
import { ChuckComponent } from './chuck.component';

// Components
import { FavoriteListComponent } from './components';
import { JokeListComponent } from './components';

// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ChuckComponent,
    FavoriteListComponent,
    JokeListComponent,
  ],
})
export class ChuckModule { }
