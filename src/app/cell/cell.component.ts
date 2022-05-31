import { Component, Input, OnInit } from '@angular/core';
import { faLandMineOn } from '@fortawesome/free-solid-svg-icons';
import { Cell } from '../interfaces';

@Component({
  selector: 'allende-minesweeper-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;

  public mineIcon = faLandMineOn;

  constructor() { }

  ngOnInit(): void {
  }

}
