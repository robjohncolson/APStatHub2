import os
import re

def create_directory_structure():
    # Read the knowledge tree file
    with open('APClassroom-Knowledge-tree.txt', 'r') as file:
        content = file.read()
    
    # Create the main directory if it doesn't exist
    main_dir = 'AP_Statistics_Course'
    if not os.path.exists(main_dir):
        os.makedirs(main_dir)
    
    # Regular expressions for different line types
    unit_pattern = r'[├└]── \*\*(Unit \d+: .+?)\*\*'
    topic_pattern = r'[│ ]*[├└]── (\d+\.\d+ .+)'
    
    # Parse the content line by line
    lines = content.split('\n')
    current_unit = None
    
    for line in lines:
        # Skip empty lines or lines without content
        if not line.strip():
            continue
        
        # Check for unit headers
        unit_match = re.search(unit_pattern, line)
        if unit_match:
            current_unit = unit_match.group(1)
            unit_dir = os.path.join(main_dir, current_unit)
            print(f"Creating unit directory: {unit_dir}")
            if not os.path.exists(unit_dir):
                os.makedirs(unit_dir)
            continue
        
        # Check for topics within units
        topic_match = re.search(topic_pattern, line)
        if topic_match and current_unit:
            topic = topic_match.group(1)
            topic_dir = os.path.join(main_dir, current_unit, topic)
            print(f"Creating topic directory: {topic_dir}")
            if not os.path.exists(topic_dir):
                os.makedirs(topic_dir)
    
    print(f"\nDirectory structure created successfully in '{main_dir}'")
    print(f"Created {len([d for d, _, _ in os.walk(main_dir)])} directories in total")

if __name__ == "__main__":
    create_directory_structure() 