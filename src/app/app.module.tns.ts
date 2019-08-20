import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, AppState } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '@components/components.module';
import { AuthModule } from './auth';
import { CoreModule } from './core/core.module';
import { NavigationModule } from './navigation/navigation.module';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NativeScriptModule,
    StoreModule.forRoot<AppState>(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    NavigationModule,
    ComponentsModule,
    FeaturesModule,
    AppRoutingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
