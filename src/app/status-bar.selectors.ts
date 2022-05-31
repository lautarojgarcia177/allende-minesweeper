import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStatusBar from './status-bar.reducer';

export const selectStatusBarState = createFeatureSelector<fromStatusBar.State>(
  fromStatusBar.statusBarFeatureKey
);
