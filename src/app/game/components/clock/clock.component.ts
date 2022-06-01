import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameService } from '../../game.service';
import { selectIsGameOver } from '../../../store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'allende-minesweeper-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {

  timeSpent = 0;
  private isGameOver$ = this.store.select(selectIsGameOver);
  private isGameOverSubscription: Subscription;
  private timeCountingInterval;

  constructor(private gameService: GameService, private store: Store) { }

  ngOnInit(): void {
    this.gameService.startTimerSubject.subscribe(
      {
        next: () => this.startCounting()
      }
    );
    this.isGameOverSubscription = this.isGameOver$.subscribe(isGameOver => {
      if (isGameOver) clearInterval(this.timeCountingInterval);
    })
  }

  ngOnDestroy(): void {
    this.isGameOverSubscription.unsubscribe();
    clearInterval(this.timeCountingInterval);
  }

  startCounting(): void {
    this.timeSpent = 0;
    this.timeCountingInterval = setInterval(() => {
      this.timeSpent += 1000;
    }, 1000);
  }

}
