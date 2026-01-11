# 2D Arcade Game

This project is a simple 2D arcade game where the player controls a character to avoid falling obstacles.

## Features

*   Player movement (left and right).
*   Falling obstacles.
*   Scoring system.
*   Collision detection.
*   Game Over state.
*   Restart mechanism.

## Architecture

The game will be developed using Python and the Pygame library. The project will be structured as follows:

*   `main.py`: The main entry point of the game. It will contain the main game loop and handle game states.
*   `player.py`: Defines the `Player` class, responsible for player movement and rendering.
*   `obstacle.py`: Defines the `Obstacle` class, responsible for obstacle movement and rendering.
*   `config.py`: Will contain all the game settings and constants.

## Sprint Plan

### Sprint 1: Core Game Structure & Player Movement
- Set up the basic game window and game loop.
- Create the player character.
- Implement player movement (left and right).

### Sprint 2: Obstacle Spawning & Movement
- Create the obstacle class.
- Implement a system for spawning obstacles at the top of the screen.
- Implement the movement of obstacles from top to bottom.

### Sprint 3: Scoring, Collision Detection, and Game Over
- Implement a scoring system.
- Implement collision detection between the player and obstacles.
- Trigger the 'Game Over' state upon collision.

### Sprint 4: Game States & Restart Mechanism
- Implement the main menu and 'Game Over' screen.
- Implement the restart functionality.
