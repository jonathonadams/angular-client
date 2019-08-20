import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AuthFacade } from './services/auth.facade.service';

export const COMPONENTS = [LoginComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    SharedModule,
    AuthRoutingModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: COMPONENTS
})
export class RootAuthModule {}

@NgModule()
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        AuthFacade,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
