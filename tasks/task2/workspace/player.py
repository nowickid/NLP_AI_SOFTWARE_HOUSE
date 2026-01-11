import pygame
from config import *

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([50, 50])
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        self.reset()

    def reset(self):
        self.rect.centerx = SCREEN_WIDTH // 2
        self.rect.bottom = SCREEN_HEIGHT - 10

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= PLAYER_SPEED
        if keys[pygame.K_RIGHT]:
            self.rect.x += PLAYER_SPEED

        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH
