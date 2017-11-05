import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatListModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatListModule,
    MatCardModule,
  ],
})
export class MaterialModule { }
