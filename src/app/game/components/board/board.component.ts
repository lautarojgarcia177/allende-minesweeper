import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "../../../store/actions";
import { Cell } from "../../classes";
import { GameService } from "../../game.service";
import { selectInitialMap } from "../../../store/selectors";
import { Subscription } from "rxjs";
import { cloneDeep } from 'lodash';
import {Howl, Howler} from 'howler';

@Component({
  selector: "allende-minesweeper-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit, OnDestroy {
  private map$ = this.store.select(selectInitialMap);
  private mapSubscription: Subscription;
  map: Array<Array<Cell>>;

  loseSound = new Howl({
    src: ['assets/audio/157218__adamweeden__video-game-die-or-lose-life.flac']
  });
  clickCellSound = new Howl({
    src: ['assets/audio/530776__rickplayer__select.mp3']
  });

  isGameOver = false;

  constructor(private store: Store, private gameService: GameService) {}

  ngOnInit(): void {
    this.mapSubscription = this.map$.subscribe((map) => {
      this.map = cloneDeep(map);
    });
  }

  ngOnDestroy(): void {
    this.mapSubscription.unsubscribe();
  }

  startGame(): void {
    this.map = this.gameService.generateRandomMap();
  }

  onBoardCellClick(cell) {
    if (cell.isMine) {
      this.store.dispatch(actions.gameOverAction());
      // Reveal all mines
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.map[i][j].isMine) this.map[i][j].isRevealed = true;
        }
      }
      // Play lose sound
      this.loseSound.play();
      return;
    }
    // Play click cell sound
    this.clickCellSound.play();
    this.revealAdjacentNonMineCells(cell);
    // reveal adjacent cells of cells with no adjacent mines
    for (let k = 0; k < 81; k++) {
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
    this.gameService.checkIfWon(this.map);
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
