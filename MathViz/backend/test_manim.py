from manim import *

class MathTest(Scene):
    def construct(self):
        # Create a mathematical equation
        equation = MathTex(r"\frac{d}{dx} \sin(x) = \cos(x)")
        
        # Create circle for visual interest
        circle = Circle(radius=2)
        
        # Display equation
        self.play(Write(equation))
        self.wait()
        
        # Move equation up
        self.play(equation.animate.shift(UP * 2))
        
        # Create and display circle
        self.play(Create(circle))
        self.wait()
        
        # Fade everything out
        self.play(FadeOut(equation), FadeOut(circle))
        self.wait()
