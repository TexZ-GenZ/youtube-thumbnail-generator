import os
import sys
import base64
from dotenv import load_dotenv
from src.services.visualization_service import execute_manim_code, generate_visualization

# Load environment variables
load_dotenv()

def test_basic_visualization():
    """Test a basic 2D shape animation."""
    try:
        prompt = "Create a visualization of a blue circle that grows from small to large and then shrinks back, with a smooth animation"
        result = run_visualization_test(prompt, "basic_circle")
        return result
    except Exception as e:
        print(f"Basic visualization test failed: {str(e)}")
        return False

def test_complex_visualization():
    """Test a more complex mathematical visualization."""
    try:
        prompt = "Create a visualization showing a sine wave being drawn from left to right, followed by a cosine wave below it in a different color"
        result = run_visualization_test(prompt, "trig_waves")
        return result
    except Exception as e:
        print(f"Complex visualization test failed: {str(e)}")
        return False

def test_text_with_animation():
    """Test text rendering with animations."""
    try:
        prompt = "Show the text 'MathViz' appearing letter by letter, then transform it into a mathematical equation E=mc²"
        result = run_visualization_test(prompt, "text_transform")
        return result
    except Exception as e:
        print(f"Text animation test failed: {str(e)}")
        return False

def run_visualization_test(prompt: str, test_name: str) -> bool:
    """Run a single visualization test and save the output."""
    try:
        print(f"\n=== Running {test_name} Test ===")
        print("Generating Manim Code...")
        result = generate_visualization(prompt)
        
        if not result.get("code"):
            print("Failed to generate code")
            return False
            
        code = result["code"]
        print(f"\nGenerated Code:\n{code}")
        
        print("\nExecuting Manim Code...")
        result = execute_manim_code(code)
        
        print("\nExecution Results:")
        print(f"STDOUT:\n{result['stdout']}")
        if result['stderr']:
            print(f"\nSTDERR:\n{result['stderr']}")
            
        # Save the video with test name
        video_data = base64.b64decode(result['video'])
        output_file = os.path.join(os.getcwd(), f'test_output_{test_name}.mp4')
        with open(output_file, 'wb') as f:
            f.write(video_data)
        print(f"\nVideo saved as {output_file}")
        
        return True
        
    except Exception as e:
        print(f"\nError in {test_name} test: {str(e)}")
        print("\nTraceback:")
        import traceback
        traceback.print_exc()
        return False

def run_all_tests():
    """Run all visualization tests."""
    tests = [
        ("Basic Shape Animation", test_basic_visualization),
        ("Complex Mathematical Visualization", test_complex_visualization),
        ("Text Animation", test_text_with_animation)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        print(f"Running Test: {test_name}")
        print('='*50)
        success = test_func()
        results.append((test_name, success))
    
    print("\n\n=== Test Results Summary ===")
    all_passed = True
    for test_name, success in results:
        status = "✓ PASSED" if success else "✗ FAILED"
        print(f"{status} - {test_name}")
        if not success:
            all_passed = False
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)