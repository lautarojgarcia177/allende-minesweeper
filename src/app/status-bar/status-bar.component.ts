import { Component, OnInit } from '@angular/core';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'allende-minesweeper-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  smileIcon = faFaceSmile;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGameOverClick() {
    
  }

}
