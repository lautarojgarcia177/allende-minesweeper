import { Component, OnInit } from '@angular/core';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { startGameAction } from 'src/app/store/actions';

@Component({
  selector: 'allende-minesweeper-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  smileIcon = faFaceSmile;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onStartGameOverClick() {
    this.store.dispatch(startGameAction());
  }

}
