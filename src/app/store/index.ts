import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { createReducer } from '@ngrx/store';
import { State } from './state';
import { gameOverReducer } from './reducers';

export const reducers: ActionReducerMap<State> = {
  isGameOver: gameOverReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
