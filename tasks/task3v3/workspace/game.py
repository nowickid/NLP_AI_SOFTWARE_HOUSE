import tkinter as tk
from snake import Snake
from food import Food

# Constants
INITIAL_SPEED = 100
HIGH_SCORE_FILE = "high_score.txt"

class Game:
    def __init__(self, master):
        self.master = master
        self.canvas = tk.Canvas(master, width=400, height=400, bg="black")
        self.canvas.pack()

        self.score = 0
        self.high_score = 0
        self.speed = INITIAL_SPEED
        self.paused = False
        self.game_over_flag = False

        self.load_high_score()

        self.snake = Snake(self.canvas)
        self.food = Food(self.canvas)

        self.score_text = self.canvas.create_text(5, 5, anchor="nw", text=f"Score: {self.score} High Score: {self.high_score}", fill="white", font=("Helvetica", 12))
        self.restart_button = None

        self.master.bind("<KeyPress>", self.on_key_press)
        self.game_loop()

    def load_high_score(self):
        try:
            with open(HIGH_SCORE_FILE, "r") as f:
                content = f.read()
                self.high_score = int(content) if content else 0
        except (FileNotFoundError, ValueError):
            self.high_score = 0

    def save_high_score(self):
        with open(HIGH_SCORE_FILE, "w") as f:
            f.write(str(self.high_score))

    def game_loop(self):
        if not self.paused and not self.game_over_flag:
            self.snake.move()

            # Check for collision with food
            if self.snake.get_head_position() == self.food.position:
                self.snake.grow()
                self.food.spawn()
                self.score += 1
                self.update_score()

                # Increase speed every 5 points
                if self.score > 0 and self.score % 5 == 0:
                    self.speed = max(20, self.speed - 10)

            # Check for collision with wall or self
            if self.check_collision():
                self.game_over()
                return

            self.draw()
        
        self.master.after(self.speed, self.game_loop)

    def check_collision(self):
        head = self.snake.get_head_position()
        x, y = head

        # Wall collision
        if x < 0 or x >= 400 or y < 0 or y >= 400:
            return True

        # Self collision
        for segment in self.snake.body[1:]:
            if head == segment:
                return True

        return False

    def draw(self):
        self.canvas.delete("game_item")
        self.snake.draw()
        self.food.draw()

    def update_score(self):
        self.canvas.itemconfig(self.score_text, text=f"Score: {self.score} High Score: {self.high_score}")

    def on_key_press(self, e):
        key = e.keysym
        if key == "space":
            self.toggle_pause()
        elif not self.paused and not self.game_over_flag:
            if key == "Up" and self.snake.direction != "Down":
                self.snake.direction = "Up"
            elif key == "Down" and self.snake.direction != "Up":
                self.snake.direction = "Down"
            elif key == "Left" and self.snake.direction != "Right":
                self.snake.direction = "Left"
            elif key == "Right" and self.snake.direction != "Left":
                self.snake.direction = "Right"

    def toggle_pause(self):
        self.paused = not self.paused

    def game_over(self):
        self.game_over_flag = True
        if self.score > self.high_score:
            self.high_score = self.score
            self.save_high_score()
        
        self.canvas.create_text(200, 150, text=f"Game Over\nYour Score: {self.score}", fill="white", font=("Helvetica", 24), justify="center")
        self.restart_button = tk.Button(self.master, text="Restart", command=self.restart_game)
        self.canvas.create_window(200, 250, window=self.restart_button)

    def restart_game(self):
        self.canvas.delete(tk.ALL)
        if self.restart_button:
            self.restart_button.destroy()

        self.score = 0
        self.speed = INITIAL_SPEED
        self.paused = False
        self.game_over_flag = False

        self.snake = Snake(self.canvas)
        self.food = Food(self.canvas)

        self.score_text = self.canvas.create_text(5, 5, anchor="nw", text=f"Score: {self.score} High Score: {self.high_score}", fill="white", font=("Helvetica", 12))
        self.update_score()
        self.game_loop()
