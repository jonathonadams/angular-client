import { ErrorEffects } from './error-effects';
import { UserEffects } from '~/app/features/users/effects/user.effects';
export const appEffects = [UserEffects, ErrorEffects];
