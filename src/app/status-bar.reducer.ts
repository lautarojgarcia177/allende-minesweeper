import { Action, createReducer, on } from '@ngrx/store';
import * as StatusBarActions from './status-bar.actions';

export const statusBarFeatureKey = 'statusBar';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(StatusBarActions.loadStatusBars, state => state),
  on(StatusBarActions.loadStatusBarsSuccess, (state, action) => state),
  on(StatusBarActions.loadStatusBarsFailure, (state, action) => state),

);
