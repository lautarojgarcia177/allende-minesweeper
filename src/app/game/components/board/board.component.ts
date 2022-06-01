import { Component, OnInit } from "@angular/core";
import { ICoordinates } from "src/app/game/interfaces";
import { Store } from '@ngrx/store';
import * as actions from '../../../store/actions';
import { Cell } from "../../classes";
import { GameService } from '../../game.service';

@Component({
  selector: "allende-minesweeper-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  map: Array<Array<Cell>>;

  isGameOver = false;

  constructor(private store: Store, private gameService: GameService) {}

  ngOnInit(): void {
    
  }

  startGame(): void {
    this.map = this.gameService.generateRandomMap();
  }

  onBoardCellClick(cell) {
    if (cell.isMine) {
      this.store.dispatch(actions.gameOverAction());
      // TODO: Effect for game end
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.map[i][j].isMine) this.map[i][j].isRevealed = true;
        }
      }
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
