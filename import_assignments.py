import os
import sqlite3
import re
import glob

def get_db_connection():
    """Connect to the SQLite database."""
    conn = sqlite3.connect('ap_stats.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_problem_images():
    """Get all problem images from the Unit1 folder."""
    unit1_path = os.path.join('AP_Statistics_Course', 'Unit 1- Exploring One-Variable Data')
    image_files = []
    
    # Get all PNG files in the Unit1 folder
    for file in glob.glob(os.path.join(unit1_path, '*.png')):
        filename = os.path.basename(file)
        # Extract problem info from filename
        year_match = re.search(r'(\d{4})', filename)
        year = year_match.group(1) if year_match else "Unknown"
        
        # Determine if it's MCQ or FRQ
        if 'MCQ' in filename:
            problem_type = 'Multiple Choice'
        elif 'FRQ' in filename or 'Frq' in filename:
            problem_type = 'Free Response'
        else:
            problem_type = 'Unknown'
        
        # Extract problem number
        num_match = re.search(r'(?:MCQ|FRQ|Frq)(\d+)', filename)
        problem_num = num_match.group(1) if num_match else ""
        
        image_files.append({
            'filename': filename,
            'path': file,
            'year': year,
            'type': problem_type,
            'number': problem_num,
            'display_name': f"{year} {problem_type} #{problem_num}" if problem_num else filename
        })
    
    return image_files

def import_assignments_from_markdown():
    """Import problem assignments from the Assignations-Unit1.md file."""
    conn = get_db_connection()
    
    # Get all problem images
    problem_images = get_problem_images()
    print(f"Found {len(problem_images)} problem images in the Unit1 folder")
    
    # Make sure all problem images are in the database
    for image in problem_images:
        filename = image['filename']
        year = image['year']
        
        # Check if this problem exists in the database
        problem = conn.execute('SELECT * FROM problems WHERE problem_number = ?', (filename,)).fetchone()
        
        # If not in database, create a new entry
        if not problem:
            conn.execute('''
                INSERT INTO problems (problem_number, description, source, year)
                VALUES (?, ?, ?, ?)
            ''', (filename, f"Problem from {year} AP Statistics Exam", "AP Statistics Exam", year))
            
            conn.commit()
            print(f"Added problem to database: {filename}")
    
    # Read the assignments file
    assignments_file = os.path.join('AP_Statistics_Course', 'Unit 1- Exploring One-Variable Data', 'Assignations-Unit1.md')
    
    if not os.path.exists(assignments_file):
        print(f"Error: File {assignments_file} not found.")
        return
    
    with open(assignments_file, 'r') as file:
        content = file.read()
    
    # Extract problem assignments
    # This is a simplified parser - we'll look for numbered items and their topic assignments
    problem_sections = re.split(r'\d+\.\s', content)[1:]  # Split by numbered items
    
    # Process each problem section
    for i, section in enumerate(problem_sections, 1):
        # Extract problem description (first paragraph)
        description_match = re.match(r'([^\.]+\.)', section.strip())
        description = description_match.group(1) if description_match else f"Problem {i}"
        
        # Extract branch information
        branch_match = re.search(r'Branch:\s+(Unit \d+:[^\\n]+)', section)
        sub_branch_match = re.search(r'Sub-Branch:\s+([^\\n]+)', section)
        
        if not branch_match or not sub_branch_match:
            print(f"Skipping problem {i} - missing branch information")
            continue
        
        # Extract year and problem number from the description
        year_match = re.search(r'(\d{4})', description)
        num_match = re.search(r'#(\d+)', description)
        
        if not year_match or not num_match:
            print(f"Skipping problem {i} - can't extract year or problem number from description: {description}")
            continue
        
        year = year_match.group(1)
        num = num_match.group(1)
        
        # Find matching image file
        matching_image = None
        for image in problem_images:
            if image['year'] == year and image['number'] == num:
                matching_image = image
                break
        
        if not matching_image:
            print(f"Skipping problem {i} - no matching image file for year {year}, problem #{num}")
            continue
        
        # Get the problem from the database
        problem = conn.execute('SELECT * FROM problems WHERE problem_number = ?', (matching_image['filename'],)).fetchone()
        
        if not problem:
            print(f"Skipping problem {i} - problem not found in database: {matching_image['filename']}")
            continue
        
        # Process unit and topics
        unit_name = branch_match.group(1).strip()
        unit_number = int(re.search(r'Unit (\d+)', unit_name).group(1))
        
        # Get the unit from the database
        unit = conn.execute('SELECT * FROM units WHERE unit_number = ?', (unit_number,)).fetchone()
        
        if not unit:
            print(f"Skipping problem {i} - unit not found: {unit_name}")
            continue
        
        # Process sub-branches (topics)
        sub_branches = sub_branch_match.group(1).split(',')
        for sub_branch in sub_branches:
            sub_branch = sub_branch.strip()
            topic_number_match = re.search(r'(\d+\.\d+)', sub_branch)
            
            if not topic_number_match:
                print(f"Skipping topic for problem {i} - can't extract topic number: {sub_branch}")
                continue
            
            topic_number = topic_number_match.group(1)
            
            # Find the topic in the database
            topic = conn.execute('''
                SELECT * FROM topics 
                WHERE topic_number = ? AND unit_id = ?
            ''', (topic_number, unit['unit_id'])).fetchone()
            
            if not topic:
                print(f"Skipping topic for problem {i} - topic not found: {topic_number}")
                continue
            
            # Check if relationship already exists
            existing = conn.execute('''
                SELECT * FROM problem_topics 
                WHERE problem_id = ? AND topic_id = ?
            ''', (problem['problem_id'], topic['topic_id'])).fetchone()
            
            if existing:
                print(f"Skipping topic for problem {i} - relationship already exists: {problem['problem_number']} -> {topic_number}")
                continue
            
            # Create the problem-topic relationship
            conn.execute('''
                INSERT INTO problem_topics (problem_id, topic_id, relevance_score, notes)
                VALUES (?, ?, ?, ?)
            ''', (problem['problem_id'], topic['topic_id'], 5, f"Imported from Assignations-Unit1.md"))
            
            conn.commit()
            print(f"Linked problem {problem['problem_number']} to topic {topic_number}")
    
    conn.close()
    print("\nImport complete")

if __name__ == "__main__":
    import_assignments_from_markdown() 