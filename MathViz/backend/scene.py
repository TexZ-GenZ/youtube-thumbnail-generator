
from manim import *

class MathVisualization(ManimScene(Scene):
    def construct(self):
        circle = Circle(radius=2, color=BLUE)
        self.play(Create(circle), run_time=1.0)
        self.wait(1.0)

        square = Square(side_length=2, color=RED)
        self.play(Transform(circle, square), run_time=1.0)
        self.wait(1.0)

        self.play(FadeOut(circle), run_time=1.0)
        self.wait(1.0)
