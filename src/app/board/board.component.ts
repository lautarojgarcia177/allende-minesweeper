import { Component, OnInit } from '@angular/core';
import { Coordinates } from '../interfaces';
class Cell implements Cell {
  constructor(public adjacentMines = 0, public isMine = false, public isRevealed = false, public isFlagged = false ) {}
}

@Component({
  selector: 'allende-minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  map: Array<Array<Cell>>;

  constructor() { }

  ngOnInit(): void {
    this.map = this.generateRandomMap();
    console.log('map', this.map);
  }

  generateRandomMap(): Array<Array<Cell>> {
    // Generate cells
    const randomMap = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
     for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        randomMap[i].push(new Cell());
      }
    }
     // Generate mines
    const minesLocations = [];
    while (minesLocations.length < 10) {
      let location = this.generateRandomCoordinates();
      if (!minesLocations.some(mineLocation => mineLocation.x === location.x && mineLocation.y === location.y)) {
        minesLocations.push(location);
      }
    }
    // Add mines to map
    for (let mineLocation of minesLocations) {
      randomMap[mineLocation.x][mineLocation.y].isMine = true;
    }
    return randomMap;
  }

  generateRandomCoordinates(): Coordinates {
    return {
      x: Math.floor(Math.random() * 9),
      y: Math.floor(Math.random() * 9),
    }
  }

}
