import { NgModule } from '@angular/core';
import { UsersModule } from './users/users.module';

/**
 * The Features module is only a convenience module to barrel all modules
 * That are NOT to be lazy loaded. This just helps to keep the AppModule clean off
 * all the modules
 */
@NgModule({
  imports: [UsersModule],
  exports: [UsersModule]
})
export class FeaturesModule {}
