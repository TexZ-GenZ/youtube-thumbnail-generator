import re
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def sanitize_prompt(prompt: str) -> str:
    """
    Sanitize the user's prompt by removing special characters and excess whitespace
    
    Args:
        prompt (str): The raw user prompt
        
    Returns:
        str: Sanitized prompt
    """
    # Remove special characters except basic punctuation
    sanitized = re.sub(r'[^a-zA-Z0-9\s.,!?-]', '', prompt)
    
    # Remove excess whitespace
    sanitized = ' '.join(sanitized.split())
    
    return sanitized

def validate_prompt(prompt: str) -> bool:
    """
    Validate the user's prompt
    
    Args:
        prompt (str): The user prompt to validate
        
    Returns:
        bool: True if prompt is valid, False otherwise
    """
    if not prompt or not isinstance(prompt, str):
        return False
        
    # Check minimum length
    if len(prompt.strip()) < 3:
        return False
        
    # Check maximum length
    if len(prompt) > 500:
        return False
        
    # Check for potentially harmful content
    harmful_patterns = [
        r'rm\s+-rf',  # System commands
        r'sudo',
        r'delete',
        r'<script',   # Script injection
        r'javascript:',
    ]
    
    for pattern in harmful_patterns:
        if re.search(pattern, prompt, re.IGNORECASE):
            logger.warning(f"Harmful pattern detected in prompt: {pattern}")
            return False
            
    return True
