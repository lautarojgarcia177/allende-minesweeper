import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faLandMineOn, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Cell } from '../../interfaces';

@Component({
  selector: 'allende-minesweeper-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;
  @Output() cellClicked = new EventEmitter<Cell>() ;

  public mineIcon = faLandMineOn;
  public flagIcon = faFlag;
  public isFlagged = false;
  public isGameOver = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCellClick() {
    this.cell.isRevealed = true;
    this.cellClicked.emit(this.cell);
  }

  onCellRightClick() {
    this.isFlagged = !this.isFlagged;
    return false;
  }

}
