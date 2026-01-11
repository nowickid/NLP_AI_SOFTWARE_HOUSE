# Snake Game

This project is a classic Snake game with a modern UI.

## Features

*   Grid-based rendering
*   Canvas drawing for the snake and food
*   Non-blocking, interval-based movement
*   Speed increases with score
*   High score persistence
*   Pause and Restart functionality

## Project Structure

The project will be structured as follows:

```
snake_game/
├── main.py         # Main application entry point
├── game.py         # Core game logic and state management
├── snake.py        # Snake class
├── food.py         # Food class
└── high_score.txt  # File for storing the high score
```

## Development Plan

The project will be developed in three sprints:

### Sprint 1: Core Game Logic and Rendering
*   **Goal:** Create the basic game structure, including the game loop, grid, snake, and food rendering. Implement the snake's movement and food consumption.
*   **Tasks:**
    1.  Set up the main application window and canvas.
    2.  Implement the `Snake` and `Food` classes.
    3.  Create the game loop.
    4.  Implement the rendering logic for the snake and food on the grid.
    5.  Implement the snake's movement logic.
    6.  Implement food consumption and snake growth.
    7.  Implement collision detection (walls and self).

### Sprint 2: Game State and UI
*   **Goal:** Implement the game state management (pause, game over) and the UI elements (score, high score, restart button).
*   **Tasks:**
    1.  Implement the pause functionality (toggled by the Spacebar).
    2.  Implement the game over state.
    3.  Display the current score.
    4.  Display the high score.
    5.  Show a 'Restart' button when the game is over.

### Sprint 3: Persistence and Speed Increase
*   **Goal:** Implement the high score persistence and the speed increase mechanism.
*   **Tasks:**
    1.  Implement saving the high score to a local file.
    2.  Implement loading the high score from the local file on application launch.
    3.  Implement the logic to increase the snake's speed every 5 points.
