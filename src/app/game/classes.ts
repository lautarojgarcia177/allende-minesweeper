import { ICoordinates } from "./interfaces";

export class Cell implements Cell {
    constructor(
      public coordinates: ICoordinates,
      public adjacentMines = 0,
      public isMine = false,
      public isRevealed = false,
      public isFlagged = false,
    ) {}
  }