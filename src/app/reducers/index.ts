import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {
  board: any,
  gameOver: boolean,
  timePlayedInMilliSeconds: number,
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
