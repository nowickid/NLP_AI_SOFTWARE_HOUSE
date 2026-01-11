## Sprint 1: Core Game Logic and Rendering

*   **Status:** COMPLETED
*   **Changes:**
    *   Created `main.py` to serve as the application entry point.
    *   Implemented the `Game` class in `game.py` to manage the core game logic, game loop, and collision detection.
    *   Implemented the `Snake` class in `snake.py` to handle the snake's movement, growth, and rendering.
    *   Implemented the `Food` class in `food.py` to manage the food's spawning and rendering.
    *   The basic game is now playable, with a "Game Over" message displayed upon collision.

## Sprint 2: Game State and UI

*   **Status:** COMPLETED
*   **Changes:**
    *   Implemented a `paused` state, which can be toggled using the `Spacebar` to pause and resume the game.
    *   Added a `game_over_flag` to manage the game-over state, preventing further movement.
    *   The UI now displays the current score and high score during gameplay.
    *   The game-over screen has been updated to show the final score and a "Restart" button.
    *   A `restart_game` method has been implemented to allow the player to start a new game after a game over.

## Sprint 3: Persistence and Speed Increase

*   **Status:** COMPLETED
*   **Changes:**
    *   Implemented `load_high_score` and `save_high_score` methods in the `Game` class to manage high score persistence using a `high_score.txt` file.
    *   The game now loads the high score on startup and saves a new high score when a game is over.
    *   The snake's speed now increases every 5 points, making the game progressively more difficult.
    *   The game speed is correctly reset when a new game is started via the 'Restart' button.

