import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { startGameAction } from '../../../store/actions';

@Component({
  selector: 'allende-minesweeper-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.scss']
})
export class WinModalComponent {

  constructor(
    public dialogRef: MatDialogRef<WinModalComponent>,
    private store: Store
  ) { }

  onPlayAgainClick(): void {
    this.store.dispatch(startGameAction());
    this.dialogRef.close();
  }
}
