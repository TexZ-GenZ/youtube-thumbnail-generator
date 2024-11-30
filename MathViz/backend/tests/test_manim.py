from manim import *

class TestScene(Scene):
    def construct(self):
        # Create basic shapes
        circle = Circle(radius=2, color=BLUE)
        square = Square(side_length=2, color=RED)
        triangle = Triangle(color=GREEN)
        
        # Create animations
        self.play(Create(circle))
        self.wait()
        self.play(Transform(circle, square))
        self.wait()
        self.play(square.animate.shift(UP))
        self.play(Create(triangle))
        self.wait(2)

class QuadraticFunction(Scene):
    def construct(self):
        # Create the axes
        axes = Axes(
            x_range=[-3, 3, 1],  # x range from -3 to 3, step size 1
            y_range=[0, 9, 1],   # y range from 0 to 9, step size 1
            axis_config={"color": BLUE},
            x_length=6,
            y_length=6
        )
        
        # Add labels
        x_label = Text("x", font_size=24).next_to(axes.x_axis.get_end(), RIGHT)
        y_label = Text("y", font_size=24).next_to(axes.y_axis.get_end(), UP)
        
        # Create the quadratic function y = x^2
        graph = axes.plot(lambda x: x**2, color=YELLOW)
        
        # Create a label for the function
        func_label = Text("y = x²", font_size=24).to_corner(UL)
        
        # Create animations
        self.play(Create(axes), Create(x_label), Create(y_label))
        self.wait()
        
        # Animate the function being drawn
        self.play(Create(graph))
        self.play(Write(func_label))
        
        # Add a moving dot that traces the function
        dot = Dot(color=RED)
        dot.move_to(axes.c2p(-3, 9))  # Start at the left end
        
        # Create a path for the dot to follow
        self.play(MoveAlongPath(dot, graph), run_time=3, rate_func=linear)
        
        self.wait(2)
