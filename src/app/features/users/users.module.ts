import { NgModule } from '@angular/core';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { UserFacade } from './services/user.facade.service';
import { UserResolver } from './services/user-resolver.service';
import { StoreModule } from '@ngrx/store';
import { UsersEntityState, usersReducer } from './reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { UsersNavigationComponent } from './components/users-navigation/users-navigation.component';
import { UsersComponent } from './components/users.component';
import { SharedModule } from '~/app/shared';

const COMPONENTS = [UserProfileComponent, UsersComponent, UsersNavigationComponent];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature<UsersEntityState>('userState', usersReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [...COMPONENTS],
  providers: [UserService, UserFacade, UserResolver],
  exports: []
})
export class UsersModule {}
