import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'allende-minesweeper-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  timeSpent = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCounting();
  }

  startCounting(): void {
    setInterval(() => {
      this.timeSpent += 1000;
    }, 1000);
  }

}
