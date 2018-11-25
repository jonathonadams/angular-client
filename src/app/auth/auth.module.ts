import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { AppMaterialModule } from '@shared/app-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';

export const COMPONENTS = [LoginComponent];

@NgModule({
  imports: [SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    AuthRoutingModule,
    // StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class RootAuthModule {}
