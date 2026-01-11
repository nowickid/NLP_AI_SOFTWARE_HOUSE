import tkinter as tk
import random

class Food:
    def __init__(self, canvas):
        self.canvas = canvas
        self.block_size = 10
        self.position = (0, 0)
        self.spawn()

    def spawn(self):
        x = random.randint(0, 39) * self.block_size
        y = random.randint(0, 39) * self.block_size
        self.position = (x, y)

    def draw(self):
        x, y = self.position
        self.canvas.create_oval(x, y, x + self.block_size, y + self.block_size, fill="red")
