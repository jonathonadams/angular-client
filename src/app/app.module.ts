import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers, AppState } from '@store/reducers';
import { ComponentsModule } from '@components/components.module';
import { AuthModule } from './auth';
import { CoreModule } from '@app-core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    ComponentsModule,
    AppRoutingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
