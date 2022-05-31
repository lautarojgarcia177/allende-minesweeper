export interface Coordinates {
  x: number;
  y: number;
}

export interface Cell {
  adjacentMines: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}
