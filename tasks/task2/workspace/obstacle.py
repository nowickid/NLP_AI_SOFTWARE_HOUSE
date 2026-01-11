import pygame
import random
from config import *

class Obstacle(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([30, 30])
        self.image.fill(WHITE)
        self.rect = self.image.get_rect()
        self.rect.x = random.randrange(SCREEN_WIDTH - self.rect.width)
        self.rect.y = random.randrange(-100, -40)
        self.speedy = random.randrange(1, 8)

    def update(self):
        self.rect.y += self.speedy
        if self.rect.top > SCREEN_HEIGHT + 10:
            self.kill()
