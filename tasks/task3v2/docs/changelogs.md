## Sprint 1: Core Game Logic and Rendering

*   **Status:** COMPLETED
*   **Changes:**
    *   Created `index.html` with the basic page structure, including a `<canvas>` element and placeholders for scores.
    *   Created `style.css` to center the game and style the UI elements.
    *   Created `script.js` to implement the core game logic:
        *   Initialized the canvas and game constants.
        *   Implemented the snake and food objects.
        *   Created a `draw` function to render the game state.
        *   Established the main game loop using `setInterval` for continuous movement.
        *   Implemented basic, non-interactive snake movement.
*   **Outcome:** The foundational visual and logical structure of the game is in place. A snake moves on the screen, and food is rendered, setting the stage for interactive features.

## Sprint 2: User Input and Game State

*   **Status:** COMPLETED
*   **Changes:**
    *   Implemented user controls in `script.js` to handle Arrow Key inputs for snake movement, preventing self-reversal.
    *   Added a pause/resume functionality triggered by the Spacebar, controlled by an `isPaused` state.
    *   Developed a `checkCollision` function to detect collisions with walls or the snake's own body.
    *   On game over, the game loop is stopped, and a "Restart" button is made visible.
    *   The "Restart" button now resets the game state and starts a new game.
*   **Outcome:** The game is now fully interactive. The player can control the snake, pause the game, and restart after losing, fulfilling the core gameplay mechanics.

## Sprint 3: Scoring and Speed Progression

*   **Status:** COMPLETED
*   **Changes:**
    *   Implemented scoring logic in `script.js`. The score increments and the snake grows when it eats food.
    *   The score is now dynamically updated and displayed on the screen.
    *   A `generateFood` function was added to ensure food does not spawn on the snake's body.
    *   Game speed now increases every 5 points by clearing the existing game loop and starting a new one with a shorter delay.
*   **Outcome:** The game now has a clear objective and increasing difficulty, making it more engaging for the player.

## Sprint 4: High Score Persistence

*   **Status:** COMPLETED
*   **Changes:**
    *   Implemented high score loading from `localStorage` when the game starts. The UI is updated with the retrieved score.
    *   Implemented high score saving to `localStorage` at the end of a game if the player's score exceeds the current high score.
    *   The high score display is updated immediately when a new record is set.
*   **Outcome:** The game now features a persistent high score that is saved across browser sessions, completing the project's feature set.

