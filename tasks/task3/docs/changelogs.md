
## Sprint 1: Core Game Logic and Rendering

### Status: COMPLETED

### Actions Taken:
1.  **File Scaffolding:** Created the complete directory structure and all necessary files for the project: `snake_game/main.py`, `snake_game/game.py`, `snake_game/snake.py`, `snake_game/food.py`, and `snake_game/high_score.txt`.
2.  **Snake Logic Implementation:** Developed the `Snake` class, which handles the snake's body, movement logic, growth upon eating food, and rendering on the canvas.
3.  **Food Logic Implementation:** Implemented the `Food` class, responsible for random spawning and rendering of the food pellet.
4.  **Core Game Engine:** Created the `Game` class, which orchestrates the entire game. This includes the main game loop, handling user key presses for direction changes, detecting collisions (with walls and the snake's own body), and managing the game-over state.
5.  **Application Entry Point:** Set up `main.py` to initialize the `tkinter` window and start the game.



## Sprint 2: Game State and UI

### Status: COMPLETED

### Actions Taken:
1.  **Game State Management:** Implemented a `paused` flag, toggled by the `Spacebar`, to freeze and unfreeze the game. An additional `game_over_flag` was added to stop the game loop upon collision.
2.  **UI Enhancements:** The `draw` method was updated to display the current score and high score on the canvas.
3.  **Game Over and Restart:** A `game_over` method was created to display a "Game Over" message and a clickable "Restart" button. A `restart_game` method was implemented to reset the game to its initial state while preserving the high score.
4.  **Quality Assurance:** All new features were manually tested and verified to be working as expected, including score display, pause/resume functionality, game over screen, high score updates, and the restart mechanism.



## Sprint 3: Persistence and Speed Increase

### Status: COMPLETED

### Actions Taken:
1.  **High Score Persistence:**
    *   Implemented a `load_high_score()` method to read the high score from `snake_game/high_score.txt` at the start of the game. The logic includes error handling for missing or empty files.
    *   Created a `save_high_score()` method to write the new high score to the file.
    *   The `game_over()` method was updated to call `save_high_score()` when a new high score is set.
2.  **Speed Increase Mechanism:**
    *   The core `game_loop()` was updated to increase the snake's speed.
    *   The game delay (`self.speed`) is now reduced by 10ms for every 5 points scored, increasing the game's difficulty.
    *   A minimum speed threshold of 20ms was set to ensure the game remains playable at high scores.
3.  **Verification:**
    *   All new features were tested and confirmed to be working as expected. The application is stable and runs without errors.


