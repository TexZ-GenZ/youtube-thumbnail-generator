from manim import *
import re
import os
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class MathVisualization(Scene):
    def __init__(self, prompt: str, **kwargs):
        super().__init__(**kwargs)
        self.prompt = prompt
        
    def construct(self):
        try:
            # Parse the prompt and generate appropriate visualization
            if "sine" in self.prompt.lower() or "sin" in self.prompt.lower():
                self._create_sine_wave()
            elif "circle" in self.prompt.lower():
                self._create_circle()
            elif "square" in self.prompt.lower():
                self._create_square()
            else:
                self._create_default_scene()
        except Exception as e:
            logger.error(f"Error in construct: {str(e)}")
            self._create_default_scene()

    def _create_sine_wave(self):
        # Extract amplitude from prompt if specified
        amplitude_match = re.search(r'amplitude\s+(\d+)', self.prompt.lower())
        amplitude = float(amplitude_match.group(1)) if amplitude_match else 2.0

        # Create axes
        axes = ThreeDAxes()
        self.play(Create(axes))
        
        # Create the sine curve
        t = ValueTracker(-4)
        curve = always_redraw(
            lambda: ParametricFunction(
                lambda x: np.array([x, amplitude * np.sin(x), 0]),
                t_range=[-4, t.get_value()],
                color=BLUE
            )
        )
        
        self.add(curve)
        self.play(t.animate.set_value(4), run_time=2)
        self.wait()

        # Add some camera movement for 3D effect
        self.move_camera(phi=75 * DEGREES, theta=30 * DEGREES)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(2)
        self.stop_ambient_camera_rotation()

    def _create_circle(self):
        circle = Circle(radius=2, color=BLUE)
        self.play(Create(circle), run_time=1.5)
        self.wait()
        
        # Add some animation
        self.play(circle.animate.scale(0.5), run_time=1)
        self.play(circle.animate.scale(2), run_time=1)
        self.wait()

    def _create_square(self):
        square = Square(side_length=4, color=RED)
        self.play(Create(square), run_time=1.5)
        self.wait()
        
        # Add rotation animation
        self.play(Rotate(square, angle=PI/2), run_time=1)
        self.wait()

    def _create_default_scene(self):
        text = Text("Could not parse visualization request", color=RED)
        self.play(Write(text))
        self.wait()

def generate_scene(prompt: str, output_path: str) -> bool:
    """
    Generate a mathematical visualization based on the prompt
    
    Args:
        prompt (str): The user's prompt describing the desired visualization
        output_path (str): Path where the output video should be saved
        
    Returns:
        bool: True if generation was successful, False otherwise
    """
    try:
        # Configure the scene for medium quality and shorter render time
        config = {
            "pixel_height": 720,
            "pixel_width": 1280,
            "frame_rate": 30,
        }
        
        scene = MathVisualization(prompt, **config)
        scene.render()
        
        # Get the rendered file path
        media_dir = config.get("media_dir", "./media")
        video_path = os.path.join(media_dir, "videos", "1080p60", "MathVisualization.mp4")
        
        if os.path.exists(video_path):
            # Move the rendered file to the desired output path
            os.rename(video_path, output_path)
            return True
        else:
            logger.error(f"Rendered video not found at {video_path}")
            return False
            
    except Exception as e:
        logger.error(f"Error generating scene: {str(e)}")
        return False
