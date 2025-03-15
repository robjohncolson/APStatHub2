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

def update_problem_references():
    """Update problem references in the database to match filenames."""
    conn = get_db_connection()
    
    # Get all existing problems from the database
    existing_problems = conn.execute('SELECT * FROM problems').fetchall()
    print(f"Found {len(existing_problems)} existing problems in the database")
    
    # Get all problem images
    problem_images = get_problem_images()
    print(f"Found {len(problem_images)} problem images in the Unit1 folder")
    
    # Create a mapping from old problem numbers to new filenames
    # This is a heuristic approach - we'll try to match based on year and problem number
    problem_mapping = {}
    
    for problem in existing_problems:
        problem_id = problem['problem_id']
        old_problem_number = problem['problem_number']
        
        # Try to extract year and problem number from the old problem number
        year_match = re.search(r'(\d{4})', old_problem_number)
        num_match = re.search(r'#(\d+)', old_problem_number)
        
        if year_match and num_match:
            year = year_match.group(1)
            num = num_match.group(1)
            
            # Look for a matching image file
            for image in problem_images:
                if image['year'] == year and image['number'] == num:
                    problem_mapping[problem_id] = image['filename']
                    break
    
    print(f"Created mapping for {len(problem_mapping)} problems")
    
    # Update problem references in the database
    for problem_id, filename in problem_mapping.items():
        conn.execute('''
            UPDATE problems
            SET problem_number = ?
            WHERE problem_id = ?
        ''', (filename, problem_id))
        
        print(f"Updated problem {problem_id} to use filename: {filename}")
    
    conn.commit()
    
    # Check for any problems that weren't mapped
    unmapped_problems = conn.execute('''
        SELECT * FROM problems
        WHERE problem_number NOT LIKE '%.png'
    ''').fetchall()
    
    if unmapped_problems:
        print(f"\nWarning: {len(unmapped_problems)} problems weren't mapped to filenames:")
        for problem in unmapped_problems:
            print(f"  - Problem ID {problem['problem_id']}: {problem['problem_number']}")
    
    # Check for any problem-topic relationships that might be orphaned
    orphaned_relationships = conn.execute('''
        SELECT pt.id, pt.problem_id, pt.topic_id
        FROM problem_topics pt
        LEFT JOIN problems p ON pt.problem_id = p.problem_id
        WHERE p.problem_id IS NULL
    ''').fetchall()
    
    if orphaned_relationships:
        print(f"\nWarning: {len(orphaned_relationships)} problem-topic relationships are orphaned")
    
    conn.close()
    print("\nDatabase update complete")

if __name__ == "__main__":
    update_problem_references() 