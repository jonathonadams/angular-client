import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';

// Meta reducers are like middleware thar run bevore any other reducder
// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
