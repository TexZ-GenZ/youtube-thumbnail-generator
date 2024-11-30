import os
import logging
import tempfile
import subprocess
import json
from groq import Groq

logger = logging.getLogger(__name__)

def execute_manim_code(code: str | dict) -> dict:
    """Execute Manim code and generate video."""
    logger = logging.getLogger(__name__)
    
    try:
        # Extract code from dict if needed
        code_str = code["code"] if isinstance(code, dict) else code
        
        # Verify the code contains the correct class name
        if "class GeneratedScene(Scene):" not in code_str:
            logger.error("Generated code does not contain the correct class name 'GeneratedScene'")
            logger.debug(f"Generated code:\n{code_str}")
            raise ValueError("Invalid code: Missing GeneratedScene class")

        # Create a temporary directory for the files
        temp_dir = tempfile.mkdtemp()
        logger.info(f"Created temporary directory: {temp_dir}")
        script_path = os.path.join(temp_dir, 'scene.py')
        
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(code_str)
        
        result = subprocess.run(
            ['python', '-m', 'manim', '-pqh', script_path, 'GeneratedScene'],
            capture_output=True,
            text=True,
            cwd=temp_dir,
            timeout=300
        )
        
        if result.returncode != 0:
            raise Exception(f"Manim command failed: {result.stderr}")
        
        video_file = os.path.join(temp_dir, 'media/videos/scene/1080p60/GeneratedScene.mp4')
        with open(video_file, 'rb') as f:
            import base64
            return {"video": base64.b64encode(f.read()).decode('utf-8')}
            
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise
    finally:
        import shutil
        shutil.rmtree(temp_dir, ignore_errors=True)

def parse_code_from_json(code_json: list) -> str:
    """Convert JSON formatted code back to Python code string."""
    code_lines = []
    for line in code_json:
        indentation = line.get("indentation", 0)
        code = line.get("code", "")
        code_lines.append("    " * indentation + code)
    return "\n".join(code_lines)

def generate_visualization(prompt: str) -> dict:
    """Generate visualization from prompt."""
    client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    
    # Construct the prompt
    system_prompt = """You are an expert in creating mathematical visualizations using Manim. Your task is to generate Manim code in a structured JSON format.

Rules:
1. Always use the class name 'GeneratedScene'
2. Keep animations between 5-10 seconds
3. Use smooth transitions and appropriate timing
4. Include helpful comments
5. Output code in JSON format where each line has indentation level and code content
6. Each line should be a JSON object with "indentation" (integer) and "code" (string) fields
7. The output must be a valid JSON array of objects
8. All JSON property names must be in double quotes
9. All string values must be in double quotes
10. No trailing commas in JSON arrays
11. Keep the Python code simple and avoid complex mathematical equations
12. Use basic Manim shapes and transformations

Example Output Format:
[
    {"indentation": 0, "code": "from manim import *"},
    {"indentation": 0, "code": "import numpy as np"},
    {"indentation": 0, "code": ""},
    {"indentation": 0, "code": "class GeneratedScene(Scene):"},
    {"indentation": 1, "code": "def construct(self):"},
    {"indentation": 2, "code": "# Create a circle with animation"},
    {"indentation": 2, "code": "circle = Circle(radius=2, color=BLUE)"},
    {"indentation": 2, "code": "self.play(Create(circle), run_time=1.0)"},
    {"indentation": 2, "code": "self.wait(0.5)"},
    {"indentation": 2, "code": ""},
    {"indentation": 2, "code": "# Scale animation"},
    {"indentation": 2, "code": "scale_up = circle.animate.scale(1.5)"},
    {"indentation": 2, "code": "self.play(scale_up, run_time=1.0)"},
    {"indentation": 2, "code": "self.wait(0.5)"},
    {"indentation": 2, "code": ""},
    {"indentation": 2, "code": "# Color animation"},
    {"indentation": 2, "code": "color_change = circle.animate.set_color(RED)"},
    {"indentation": 2, "code": "self.play(color_change, run_time=1.0)"},
    {"indentation": 2, "code": "self.wait(0.5)"}
]

Remember: 
1. The output must be a valid JSON array that can be parsed by Python's json.loads() function.
2. Keep the Python code simple and focus on visual elements.
3. Use .animate for smooth animations instead of complex updater functions."""
    
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Write Manim code in JSON format for: {prompt}"}
        ],
        model="mixtral-8x7b-32768",
        temperature=0.7,
        max_tokens=2000,
        stream=False
    )
    
    try:
        # Parse the response as JSON
        code_json = json.loads(response.choices[0].message.content.strip())
        
        # Validate the JSON structure
        if not isinstance(code_json, list):
            raise ValueError("Generated code is not a list of lines")
            
        for line in code_json:
            if not isinstance(line, dict):
                raise ValueError("Each line must be a dictionary")
            if "indentation" not in line or "code" not in line:
                raise ValueError("Each line must have 'indentation' and 'code' fields")
            if not isinstance(line["indentation"], int):
                raise ValueError("Indentation must be an integer")
            if not isinstance(line["code"], str):
                raise ValueError("Code must be a string")
        
        # Convert JSON to Python code
        code = parse_code_from_json(code_json)
        
        return {
            "code": code,
            "prompt": prompt
        }
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse generated code as JSON: {str(e)}")
        raise ValueError("Generated code is not valid JSON")
    except Exception as e:
        logger.error(f"Error processing generated code: {str(e)}")
        raise