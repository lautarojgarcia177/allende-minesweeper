import { Component } from '@angular/core';

@Component({
  selector: 'allende-minesweeper-root',
  template: `
  <div class="d-flex flex-column justify-content-center align-items-center">
    <allende-minesweeper-status-bar></allende-minesweeper-status-bar>
    <allende-minesweeper-board></allende-minesweeper-board>
  </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'allende_buscaminas';
}
