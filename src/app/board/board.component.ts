import { Component, OnInit } from "@angular/core";
import { Coordinates } from "../interfaces";
class Cell implements Cell {
  constructor(
    public coordinates: Coordinates,
    public adjacentMines = 0,
    public isMine = false,
    public isRevealed = false,
    public isFlagged = false,
  ) {}
}

@Component({
  selector: "allende-minesweeper-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  map: Array<Array<Cell>>;

  isGameOver = false;

  constructor() {}

  ngOnInit(): void {
    this.map = this.generateRandomMap();
    console.log("map", this.map);
  }

  generateRandomMap(): Array<Array<Cell>> {
    // Generate cells
    const randomMap = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        randomMap[i].push(new Cell({ x: i, y: j }));
      }
    }
    // Generate mines
    const minesLocations = [];
    while (minesLocations.length < 10) {
      let location = this.generateRandomCoordinates();
      if (
        !minesLocations.some(
          (mineLocation) =>
            mineLocation.x === location.x && mineLocation.y === location.y
        )
      ) {
        minesLocations.push(location);
      }
    }
    // Add mines to map
    for (let mineLocation of minesLocations) {
      randomMap[mineLocation.x][mineLocation.y].isMine = true;
    }
    // Calculate adjacent mines for each cell
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        randomMap[i][j].adjacentMines = this.calculateAdjacentMines(
          { x: i, y: j },
          randomMap
        );
      }
    }
    return randomMap;
  }

  generateRandomCoordinates(): Coordinates {
    return {
      x: Math.floor(Math.random() * 9),
      y: Math.floor(Math.random() * 9),
    };
  }

  calculateAdjacentMines(
    coordinates: Coordinates,
    map: Array<Array<Cell>>
  ): number {
    let adjacentMines = 0;
    if (
      map[coordinates.x + 1] &&
      map[coordinates.x + 1][coordinates.y] &&
      map[coordinates.x + 1][coordinates.y].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x + 1] &&
      map[coordinates.x + 1][coordinates.y + 1] &&
      map[coordinates.x + 1][coordinates.y + 1].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x + 1] &&
      map[coordinates.x + 1][coordinates.y - 1] &&
      map[coordinates.x + 1][coordinates.y - 1].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x - 1] &&
      map[coordinates.x - 1][coordinates.y] &&
      map[coordinates.x - 1][coordinates.y].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x - 1] &&
      map[coordinates.x - 1][coordinates.y + 1] &&
      map[coordinates.x - 1][coordinates.y + 1].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x - 1] &&
      map[coordinates.x - 1][coordinates.y - 1] &&
      map[coordinates.x - 1][coordinates.y - 1].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x] &&
      map[coordinates.x][coordinates.y + 1] &&
      map[coordinates.x][coordinates.y + 1].isMine
    )
      adjacentMines++;
    if (
      map[coordinates.x] &&
      map[coordinates.x][coordinates.y - 1] &&
      map[coordinates.x][coordinates.y - 1].isMine
    )
      adjacentMines++;
    return adjacentMines;
  }

  onBoardCellClick(cell) {
    if (cell.isMine) {
      this.isGameOver = true;
      return;
    }
    this.revealAdjacentNonMineCells(cell);
    // reveal adjacent cells of cells with no adjacent mines
      for(let k = 0; k < 81; k ++) {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (
              this.map[i][j].isRevealed &&
              this.map[i][j].adjacentMines === 0 &&
              !this.map[i][j].isMine
            ) {
              this.revealAdjacentNonMineCells(this.map[i][j]);
            }
          }
        }
      }
  }

  revealAdjacentNonMineCells(cell: Cell): void {
    if (
      this.map[cell.coordinates.x + 1] &&
      this.map[cell.coordinates.x + 1][cell.coordinates.y] &&
      this.map[cell.coordinates.x + 1][cell.coordinates.y].isMine === false
    ) {
      this.map[cell.coordinates.x + 1][cell.coordinates.y].isRevealed = true;
    }
    if (
      this.map[cell.coordinates.x + 1] &&
      this.map[cell.coordinates.x + 1][cell.coordinates.y + 1] &&
      this.map[cell.coordinates.x + 1][cell.coordinates.y + 1].isMine === false
    ) {
      this.map[cell.coordinates.x + 1][cell.coordinates.y + 1].isRevealed =
        true;
    }
    if (
      this.map[cell.coordinates.x + 1] &&
      this.map[cell.coordinates.x + 1][cell.coordinates.y - 1] &&
      this.map[cell.coordinates.x + 1][cell.coordinates.y - 1].isMine === false
    ) {
      this.map[cell.coordinates.x + 1][cell.coordinates.y - 1].isRevealed =
        true;
    }
    if (
      this.map[cell.coordinates.x - 1] &&
      this.map[cell.coordinates.x - 1][cell.coordinates.y] &&
      this.map[cell.coordinates.x - 1][cell.coordinates.y].isMine === false
    ) {
      this.map[cell.coordinates.x - 1][cell.coordinates.y].isRevealed = true;
    }
    if (
      this.map[cell.coordinates.x - 1] &&
      this.map[cell.coordinates.x - 1][cell.coordinates.y + 1] &&
      this.map[cell.coordinates.x - 1][cell.coordinates.y + 1].isMine === false
    ) {
      this.map[cell.coordinates.x - 1][cell.coordinates.y + 1].isRevealed =
        true;
    }
    if (
      this.map[cell.coordinates.x - 1] &&
      this.map[cell.coordinates.x - 1][cell.coordinates.y - 1] &&
      this.map[cell.coordinates.x - 1][cell.coordinates.y - 1].isMine === false
    ) {
      this.map[cell.coordinates.x - 1][cell.coordinates.y - 1].isRevealed =
        true;
    }
    if (
      this.map[cell.coordinates.x] &&
      this.map[cell.coordinates.x][cell.coordinates.y + 1] &&
      this.map[cell.coordinates.x][cell.coordinates.y + 1].isMine === false
    ) {
      this.map[cell.coordinates.x][cell.coordinates.y + 1].isRevealed = true;
    }
    if (
      this.map[cell.coordinates.x] &&
      this.map[cell.coordinates.x][cell.coordinates.y - 1] &&
      this.map[cell.coordinates.x][cell.coordinates.y - 1].isMine === false
    ) {
      this.map[cell.coordinates.x][cell.coordinates.y - 1].isRevealed = true;
    }
  }
}
