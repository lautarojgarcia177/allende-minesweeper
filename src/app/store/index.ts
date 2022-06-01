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
import { gameOverReducer, initialMapReducer } from './reducers';

export const reducers: ActionReducerMap<State> = {
  isGameOver: gameOverReducer,
  initialMap: initialMapReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
