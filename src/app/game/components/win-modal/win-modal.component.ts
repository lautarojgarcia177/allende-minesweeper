import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { startGameAction } from '../../../store/actions';

export interface WinDialogData {
  timeSpentInMilliseconds: number;
}

@Component({
  selector: 'allende-minesweeper-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.scss']
})
export class WinModalComponent {

  constructor(
    public dialogRef: MatDialogRef<WinModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WinDialogData,
    private store: Store
  ) { }

  onPlayAgainClick(): void {
    this.store.dispatch(startGameAction());
    this.dialogRef.close();
  }
}
