import { Cell } from "../game/classes";

export interface State {
  isGameOver: boolean;
  initialMap: Array<Array<Cell>>;
} 

export const initialState: State = {
    isGameOver: false,
    initialMap: null,
}