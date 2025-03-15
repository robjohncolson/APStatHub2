import os
import re

def create_directory_structure():
    # Read the structured knowledge tree file
    with open('APStats-StructuredTree.txt', 'r') as file:
        lines = file.readlines()
    
    # Create the main directory if it doesn't exist
    main_dir = 'AP_Statistics_Course'
    if not os.path.exists(main_dir):
        os.makedirs(main_dir)
    
    current_unit = None
    unit_count = 0
    topic_count = 0
    
    # Function to sanitize directory names (remove invalid characters)
    def sanitize_dirname(name):
        # Replace colons with dashes and any other invalid characters
        return re.sub(r'[<>:"/\\|?*]', '-', name)
    
    # Process each line
    for line in lines:
        line = line.strip()
        
        # Skip empty lines
        if not line:
            continue
        
        # Process unit lines
        if line.startswith('UNIT:'):
            current_unit = line[5:]  # Remove the 'UNIT:' prefix
            # Sanitize the unit name for directory creation
            sanitized_unit = sanitize_dirname(current_unit)
            unit_dir = os.path.join(main_dir, sanitized_unit)
            print(f"Creating unit directory: {unit_dir}")
            if not os.path.exists(unit_dir):
                os.makedirs(unit_dir)
            unit_count += 1
        
        # Process topic lines
        elif line.startswith('TOPIC:') and current_unit:
            topic = line[6:]  # Remove the 'TOPIC:' prefix
            # Sanitize the topic name for directory creation
            sanitized_topic = sanitize_dirname(topic)
            # Use the sanitized unit name for consistency
            sanitized_unit = sanitize_dirname(current_unit)
            topic_dir = os.path.join(main_dir, sanitized_unit, sanitized_topic)
            print(f"Creating topic directory: {topic_dir}")
            if not os.path.exists(topic_dir):
                os.makedirs(topic_dir)
            topic_count += 1
    
    print(f"\nDirectory structure created successfully in '{main_dir}'")
    print(f"Created {unit_count} unit directories and {topic_count} topic directories")
    print(f"Total: {unit_count + topic_count + 1} directories (including main directory)")

if __name__ == "__main__":
    create_directory_structure() 