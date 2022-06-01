import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { resetMapAction } from "../store/actions";
import { Cell } from "./classes";
import { ICell, ICoordinates } from "./interfaces";
import { WinModalComponent } from './components/win-modal/win-modal.component';

@Injectable({
  providedIn: "root",
})
export class GameService {
  startTimerSubject = new Subject();

  constructor(private store: Store, public dialog: MatDialog) {}

  startGame(): void {
    const newMap = this.generateRandomMap();
    this.store.dispatch(resetMapAction({ map: newMap }));
    // Set timeout to give time for clock component to initialize before first subject emission
    setTimeout(() => this.startTimerSubject.next({}));
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
        randomMap[i][j].adjacentMines = this.calculateCellAdjacentMines(
          { x: i, y: j },
          randomMap
        );
      }
    }
    return randomMap;
  }

  generateRandomCoordinates(): ICoordinates {
    return {
      x: Math.floor(Math.random() * 9),
      y: Math.floor(Math.random() * 9),
    };
  }

  calculateCellAdjacentMines(
    coordinates: ICoordinates,
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

  openWinDialog(): void {
    this.dialog.open(WinModalComponent);
  }

  checkIfWon(map: Array<Array<Cell>>): void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!map[i][j].isRevealed && !map[i][j].isMine) return;
      }
    }
    this.openWinDialog();
  }
}
