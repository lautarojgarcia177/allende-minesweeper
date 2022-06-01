import { Component } from '@angular/core';

@Component({
  selector: 'allende-minesweeper-root',
  template: `
  <allende-minesweeper-status-bar></allende-minesweeper-status-bar>
  <allende-minesweeper-board></allende-minesweeper-board>
  `,
  styles: []
})
export class AppComponent {
  title = 'allende_buscaminas';
}
