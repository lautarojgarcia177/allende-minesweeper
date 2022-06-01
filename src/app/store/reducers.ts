import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "./actions";
import { initialState } from "./state";

export const gameOverReducer = createReducer(
  initialState.isGameOver,
  on(actions.gameOverAction, (state, {}) => true),
  on(actions.startGameAction, (state, {}) => false),
);