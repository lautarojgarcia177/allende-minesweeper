import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faLandMineOn, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectIsGameOver } from 'src/app/store/selectors';
import { Cell } from '../../classes';

@Component({
  selector: 'allende-minesweeper-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, OnDestroy {

  @Input() cell: Cell;
  @Output() cellClicked = new EventEmitter<Cell>() ;

  public mineIcon = faLandMineOn;
  public flagIcon = faFlag;
  public isFlagged = false;
  private isGameOver$ = this.store.select(selectIsGameOver);
  public isGameOver = false;
  private isGameOverSubscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isGameOverSubscription = this.isGameOver$.subscribe(isGameOver => this.isGameOver = isGameOver);
  }

  ngOnDestroy(): void {
    this.isGameOverSubscription.unsubscribe();
  }

  onCellClick() {
    if (!this.isGameOver) {
      this.cell.isRevealed = true;
      this.cellClicked.emit(this.cell);
    }
  }

  onCellRightClick() {
    if (!this.isGameOver) {
      this.isFlagged = !this.isFlagged;
    }
    return false;
  }

}
