import { createAction, props } from '@ngrx/store';

export const loadStatusBars = createAction(
  '[StatusBar] Load StatusBars'
);

export const loadStatusBarsSuccess = createAction(
  '[StatusBar] Load StatusBars Success',
  props<{ data: any }>()
);

export const loadStatusBarsFailure = createAction(
  '[StatusBar] Load StatusBars Failure',
  props<{ error: any }>()
);
