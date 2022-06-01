import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

@Injectable()
export class StartGameEffect {
  startGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType("StartGame"),
        tap((action) => console.log(action))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
