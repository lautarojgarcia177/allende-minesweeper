import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { GameService } from '../game/game.service';

@Injectable()
export class StartGameEffect {
  startGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType("StartGame"),
        tap((action) => this.gameService.startGame())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private gameService: GameService) {}
}
