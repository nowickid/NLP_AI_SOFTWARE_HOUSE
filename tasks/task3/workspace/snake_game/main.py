import tkinter as tk
from game import Game

def main():
    root = tk.Tk()
    root.title("Snake Game")
    game = Game(root)
    root.mainloop()

if __name__ == "__main__":
    main()
