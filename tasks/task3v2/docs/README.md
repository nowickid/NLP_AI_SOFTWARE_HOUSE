# Snake Game

This project is a classic Snake game with a modern UI.

## Features

*   **Grid-based rendering:** The game is displayed on a grid.
*   **Graphical Canvas:** A canvas element is used for drawing the snake and food.
*   **Non-blocking movement:** The snake moves automatically at a fixed interval.
*   **Increasing speed:** The snake's speed increases as the score goes up.
*   **Persistence:** A high score system that saves the best score to a local file.
*   **Game State Management:** Pause and Restart functionalities.

## Project Structure

```
/
|-- index.html
|-- style.css
|-- script.js
|-- highscore.txt
```

## Development Plan

### Sprint 1: Core Game Logic and Rendering
*   **Goal:** Create the basic game board, render the snake and food. Implement the core game loop.
*   **Tasks:**
    *   Set up the HTML canvas.
    *   Create the game loop.
    *   Implement the snake and food objects.
    *   Render the snake and food on the canvas.
    *   Implement basic snake movement.

### Sprint 2: User Input and Game State
*   **Goal:** Implement user controls for the snake, add pause/resume functionality, and handle game over conditions.
*   **Tasks:**
    *   Add event listeners for keyboard input (arrow keys for movement, spacebar for pause).
    *   Implement the pause/resume logic.
    *   Implement game over conditions (collision with walls or self).
    *   Display a "Game Over" message and a "Restart" button.

### Sprint 3: Scoring and Speed Progression
*   **Goal:** Implement the scoring system and make the snake's speed increase with the score.
*   **Tasks:**
    *   Increment the score when the snake eats food.
    *   Increase the snake's speed every 5 points.
    *   Display the current score on the screen.

### Sprint 4: High Score Persistence
*   **Goal:** Implement the high score system with local file storage.
*   **Tasks:**
    *   Create functions to save the high score to a local file.
    *   Create functions to load the high score from the local file.
    *   Display the high score on the screen.
    *   Update the high score when a new record is set.
