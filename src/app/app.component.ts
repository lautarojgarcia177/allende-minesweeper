import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startGameAction } from './store/actions';

@Component({
  selector: 'allende-minesweeper-root',
  template: `
  <div class="d-flex flex-column justify-content-center">
    <allende-minesweeper-status-bar></allende-minesweeper-status-bar>
    <allende-minesweeper-board></allende-minesweeper-board>
  </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.store.dispatch(startGameAction());
  }
}
