import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Application wide singletons
import { JokeService } from './services';
import { ApiService } from './services';

// Eager loaded module
import { ChuckModule } from '../chuck/chuck.module';

@NgModule({
  imports: [
    ChuckModule,
    HttpClientModule,
  ],
  providers: [
    JokeService,
    ApiService,
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
