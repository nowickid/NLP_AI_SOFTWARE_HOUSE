import tkinter as tk
from snake import Snake
from food import Food

class Game:
    def __init__(self, master):
        self.master = master
        self.canvas = tk.Canvas(master, width=400, height=400, bg="black")
        self.canvas.pack()
        self.snake = Snake(self.canvas)
        self.food = Food(self.canvas)
        self.score = 0
        self.high_score = 0
        self.speed = 100
        self.paused = False
        self.game_over_flag = False
        self.master.bind("<KeyPress>", self.on_key_press)
        self.load_high_score()
        self.game_loop()

    def load_high_score(self):
        try:
            with open("snake_game/high_score.txt", "r") as f:
                content = f.read()
                if content:
                    self.high_score = int(content)
                else:
                    self.high_score = 0
        except (FileNotFoundError, ValueError):
            self.high_score = 0

    def save_high_score(self):
        with open("snake_game/high_score.txt", "w") as f:
            f.write(str(self.high_score))

    def game_loop(self):
        if not self.paused and not self.game_over_flag:
            self.snake.move()
            if self.snake.get_head_position() == self.food.position:
                self.snake.grow()
                self.food.spawn()
                self.score += 1
                if self.score % 5 == 0 and self.speed > 20:
                    self.speed = max(20, self.speed - 10)
            if self.check_collision():
                self.game_over()
                return
            self.draw()
        self.master.after(self.speed, self.game_loop)

    def check_collision(self):
        head = self.snake.get_head_position()
        x, y = head
        if x < 0 or x >= 400 or y < 0 or y >= 400:
            return True
        for segment in self.snake.body[1:]:
            if head == segment:
                return True
        return False

    def draw(self):
        self.canvas.delete(tk.ALL)
        self.snake.draw()
        self.food.draw()
        self.canvas.create_text(50, 10, text=f"Score: {self.score}", fill="white", font=("Helvetica", 12))
        self.canvas.create_text(350, 10, text=f"High Score: {self.high_score}", fill="white", font=("Helvetica", 12))

    def on_key_press(self, e):
        key = e.keysym
        if key == "space":
            self.paused = not self.paused
        elif not self.paused:
            if key == "Up" and self.snake.direction != "Down":
                self.snake.direction = "Up"
            elif key == "Down" and self.snake.direction != "Up":
                self.snake.direction = "Down"
            elif key == "Left" and self.snake.direction != "Right":
                self.snake.direction = "Left"
            elif key == "Right" and self.snake.direction != "Left":
                self.snake.direction = "Right"

    def game_over(self):
        self.game_over_flag = True
        if self.score > self.high_score:
            self.high_score = self.score
            self.save_high_score()
        self.canvas.create_text(200, 150, text="Game Over", fill="white", font=("Helvetica", 24))
        restart_button = tk.Button(self.master, text="Restart", command=self.restart_game)
        self.canvas.create_window(200, 200, window=restart_button)

    def restart_game(self):
        self.canvas.delete(tk.ALL)
        self.snake = Snake(self.canvas)
        self.food = Food(self.canvas)
        self.score = 0
        self.speed = 100
        self.paused = False
        self.game_over_flag = False
        self.game_loop()
