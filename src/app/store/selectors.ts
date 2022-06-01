import { createSelector } from '@ngrx/store';
import { State } from './state';

const selectState = (state: State) => state;

export const selectIsGameOver = createSelector(
    selectState,
    (state: State) => state.isGameOver
);

