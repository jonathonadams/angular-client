import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { createApollo } from './graphql/createApollo';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

const COMPONENTS = [];

@NgModule({
  imports: [NativeScriptHttpClientModule, NativeScriptCommonModule, ApolloModule, HttpLinkModule],
  declarations: COMPONENTS
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApollo,
          deps: [HttpLink]
        }
      ]
    };
  }
}
