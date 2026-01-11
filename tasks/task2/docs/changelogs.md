### Sprint 1: Core Game Structure & Player Movement

*   **File Creation**: Successfully created the three core files for the game: `config.py`, `player.py`, and `main.py`.
*   **Configuration**: Implemented `config.py` to hold all static variables, including screen dimensions, colors, and player speed.
*   **Player Class**: Developed the `Player` class in `player.py`, which inherits from `pygame.sprite.Sprite`. This class manages the player's visual representation, initial positioning, and movement logic.
*   **Movement Logic**: The `Player.update()` method was implemented to handle keyboard input (left and right arrow keys) and update the player's position, including boundary checks.
*   **Main Game Loop**: Created the main entry point in `main.py`, which initializes Pygame, sets up the game window, and runs the core game loop.
*   **Integration**: Integrated the `Player` class into `main.py`, using a `pygame.sprite.Group` to manage updates and rendering.


### Sprint 2: Obstacle Spawning & Movement

*   **`obstacle.py` Created**: A new file was created to define the `Obstacle` class, which manages the obstacle's appearance, random initial position, and random downward speed.
*   **Obstacle Logic Implemented**: The `Obstacle` class includes an `update` method for vertical movement and logic to automatically despawn (`self.kill()`) when it moves off-screen.
*   **Spawning Integrated into `main.py`**: The main game loop was updated to manage obstacle creation. A new sprite group, `obstacles`, was created. The loop now dynamically spawns new obstacles to maintain a consistent number on screen.


### Sprint 3: Scoring, Collision Detection, and Game Over

*   **Scoring System**: Implemented a score that increments with time and is displayed on the screen.
*   **Collision Detection**: Added logic to detect collisions between the player and obstacles using `pygame.sprite.spritecollide`.
*   **Game Over State**: A `game_over` state is now triggered upon collision, which freezes gameplay and displays a "Game Over" message.
*   **Helper Function**: A `draw_text` function was created to simplify rendering text for the score and game over messages.


### Sprint 4: Game States & Restart Mechanism

*   **State Machine Implementation**: Refactored the main loop from a simple boolean to a state-based system (`MENU`, `PLAYING`, `GAME_OVER`).
*   **`reset_game()` Function**: Created a dedicated function to reset the score, player position, and obstacles for a new game session.
*   **Main Loop Update**: The main loop now handles logic and rendering based on the current game state.
*   **Restart Mechanism**: The player can now start the game from a menu and restart from the 'Game Over' screen without closing the application.
*   **`player.py` Update**: Added a `reset()` method to the `Player` class to reposition the character at the start of a new game.


