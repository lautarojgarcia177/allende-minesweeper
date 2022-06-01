import { Component, OnInit } from '@angular/core';
import { faFaceDizzy, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { startGameAction } from 'src/app/store/actions';
import { selectIsGameOver } from '../../../store/selectors';

@Component({
  selector: 'allende-minesweeper-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  smileIcon = faFaceSmile;
  faceDizzyIcon = faFaceDizzy;

  isGameOver$ = this.store.select(selectIsGameOver);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onStartGameOverClick() {
    this.store.dispatch(startGameAction());
  }

}
