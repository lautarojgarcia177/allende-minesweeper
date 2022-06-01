# AllendeBuscaminas

Web implementation of the classic minesweeper game

## Technologies
- Angular 13
- NgRx
- Angular Material
- Bootstrap

Component comunication is done in several ways:
- Through Angular's @Input and @Output
- Global state with Redux (NgRx)
- Angular's Service (game.service.ts)

The UI components can be found in src/app/game/components

The Global State managment solution can be found in src/app/store

## Explanation

Entry point of the application is app.component.ts where start game action is dispatched, that action triggers an effect that calls the game.service.ts startGame() function.

GameService's startGame() function generates a random map and dispatches it to the store which updates the state via reducer. Also, it starts the timer Subject which tells the clock component to start counting the time.

Board component is the one that holds all the cells, it gets its initial board from the store, deep clones it in order to work with it (because store objects are read only).

Everytime the user clicks a cell, checkIfWon method in game.service.ts is called via the board component. If winning conditions are met, the game stops and a modal notification is shown.

Code flow can be easily followed looking at the events that get triggered in board component.


### About

Made with 💌 by [Lautaro Garcia](https://github.com/lautarojgarcia177/lautarojgarcia177) for a code challenge in Cordoba's Allende Hospital