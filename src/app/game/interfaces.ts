export interface ICoordinates {
  x: number;
  y: number;
}

export interface ICell {
  adjacentMines: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}
