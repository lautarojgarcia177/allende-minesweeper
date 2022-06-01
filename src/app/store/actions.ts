import { createAction, props } from '@ngrx/store';
import { Cell } from '../game/classes';

export const gameOverAction = createAction(
  'GameOver'
);

export const startGameAction = createAction(
  'StartGame'
);

export const resetMapAction = createAction(
  'ResetMap',
  props<{ map: Array<Array<Cell>> }>()
);
