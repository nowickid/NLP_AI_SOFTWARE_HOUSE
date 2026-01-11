import tkinter as tk

class Snake:
    def __init__(self, canvas):
        self.canvas = canvas
        self.body = [(100, 100), (90, 100), (80, 100)]
        self.direction = "Right"
        self.block_size = 10

    def move(self):
        head_x, head_y = self.body[0]

        if self.direction == "Up":
            new_head = (head_x, head_y - self.block_size)
        elif self.direction == "Down":
            new_head = (head_x, head_y + self.block_size)
        elif self.direction == "Left":
            new_head = (head_x - self.block_size, head_y)
        elif self.direction == "Right":
            new_head = (head_x + self.block_size, head_y)

        self.body.insert(0, new_head)
        self.body.pop()

    def grow(self):
        self.body.append(self.body[-1])

    def draw(self):
        for x, y in self.body:
            self.canvas.create_rectangle(x, y, x + self.block_size, y + self.block_size, fill="green")

    def get_head_position(self):
        return self.body[0]
