import pygame
import sys
from player import Player
from obstacle import Obstacle
from config import *

# --- Initialization ---
pygame.init()

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("2D Arcade Game")
clock = pygame.time.Clock()

# --- Game States ---
MENU = "MENU"
PLAYING = "PLAYING"
GAME_OVER = "GAME_OVER"

# --- Font ---
def draw_text(surf, text, size, x, y):
    font = pygame.font.Font(None, size)
    text_surface = font.render(text, True, WHITE)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)

# --- Sprite Groups ---
all_sprites = pygame.sprite.Group()
obstacles = pygame.sprite.Group()

# --- Game Objects ---
player = Player()
# Note: Player is not added to all_sprites here initially.
# It will be added in reset_game().

# --- Game Variables ---
score = 0
game_state = MENU

# --- Game Functions ---
def reset_game():
    global score, game_state

    # 1. Reset score
    score = 0

    # 2. Reset player
    player.reset()

    # 3. Empty sprite groups
    all_sprites.empty()
    obstacles.empty()

    # 4. Re-add player to all_sprites
    all_sprites.add(player)

    # 5. Spawn new obstacles
    for i in range(8):
        o = Obstacle()
        all_sprites.add(o)
        obstacles.add(o)

    # 6. Set game state to PLAYING
    game_state = PLAYING

# --- Main Game Loop ---
running = True
while running:
    # Keep loop running at the right speed
    clock.tick(60)

    # --- Event Handling ---
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if game_state == MENU:
                if event.key == pygame.K_s:
                    reset_game()
            elif game_state == GAME_OVER:
                if event.key == pygame.K_r:
                    reset_game()

    # --- Update ---
    if game_state == PLAYING:
        all_sprites.update()

        # Check for player-obstacle collisions
        hits = pygame.sprite.spritecollide(player, obstacles, False)
        if hits:
            game_state = GAME_OVER

        # Respawn obstacles that have fallen off-screen
        while len(obstacles) < 8:
            o = Obstacle()
            all_sprites.add(o)
            obstacles.add(o)
        
        # Increment score
        score += 1

    # --- Draw / Render ---
    screen.fill(BLACK)

    if game_state == MENU:
        draw_text(screen, "2D Arcade Game", 64, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4)
        draw_text(screen, "Press S to Start", 22, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
    
    elif game_state == PLAYING:
        all_sprites.draw(screen)
        draw_text(screen, str(score), 36, SCREEN_WIDTH / 2, 10)

    elif game_state == GAME_OVER:
        # We still draw the sprites to show the final state
        all_sprites.draw(screen)
        draw_text(screen, "Game Over", 64, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4)
        draw_text(screen, f"Final Score: {score}", 30, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
        draw_text(screen, "Press R to Restart", 22, SCREEN_WIDTH / 2, SCREEN_HEIGHT * 3 / 4)

    # After drawing everything, flip the display
    pygame.display.flip()

# --- Exit ---
pygame.quit()
sys.exit()
