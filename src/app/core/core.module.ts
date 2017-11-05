import { NgModule, Optional, SkipSelf } from '@angular/core';

// Application wide singletons
import { JokeService } from './services';

// Eager loaded module
import { ChuckModule } from '../chuck/chuck.module';

@NgModule({
  imports: [
    ChuckModule,
  ],
  providers: [
    JokeService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    // Throw error when CoreModule is already instantiated.
    // https://angular.io/guide/ngmodule#prevent-reimport-of-the-coremodule
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
