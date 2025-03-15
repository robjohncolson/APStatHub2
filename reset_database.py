import os
import sqlite3
import re
import glob
import shutil

def reset_database():
    """Reset the database and rebuild it from scratch."""
    db_path = 'ap_stats.db'
    
    # Backup the existing database if it exists
    if os.path.exists(db_path):
        backup_path = f"{db_path}.backup"
        shutil.copy2(db_path, backup_path)
        print(f"Backed up existing database to {backup_path}")
        
        # Delete the existing database
        os.remove(db_path)
        print(f"Deleted existing database {db_path}")
    
    # Create a new database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    print(f"Created new database {db_path}")
    
    # Create the tables
    cursor.execute('''
    CREATE TABLE units (
        unit_id INTEGER PRIMARY KEY,
        unit_number INTEGER,
        unit_name TEXT,
        full_path TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE topics (
        topic_id INTEGER PRIMARY KEY,
        unit_id INTEGER,
        topic_number TEXT,
        topic_name TEXT,
        full_path TEXT,
        FOREIGN KEY (unit_id) REFERENCES units (unit_id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE problems (
        problem_id INTEGER PRIMARY KEY,
        problem_number TEXT,
        description TEXT,
        source TEXT,
        year INTEGER,
        difficulty INTEGER
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE problem_topics (
        id INTEGER PRIMARY KEY,
        problem_id INTEGER,
        topic_id INTEGER,
        relevance_score INTEGER,
        notes TEXT,
        FOREIGN KEY (problem_id) REFERENCES problems (problem_id),
        FOREIGN KEY (topic_id) REFERENCES topics (topic_id)
    )
    ''')
    
    conn.commit()
    print("Created database tables")
    
    # Import the knowledge tree
    tree_file = 'APStats-StructuredTree.txt'
    if not os.path.exists(tree_file):
        print(f"ERROR: Knowledge tree file {tree_file} not found!")
        conn.close()
        return
    
    with open(tree_file, 'r') as file:
        lines = file.readlines()
    
    current_unit_id = None
    
    for line in lines:
        line = line.strip()
        
        if not line:
            continue
        
        # Process unit lines
        if line.startswith('UNIT:'):
            unit_name = line[5:]  # Remove the 'UNIT:' prefix
            unit_match = re.match(r'Unit (\d+): (.+)', unit_name)
            
            if unit_match:
                unit_number = int(unit_match.group(1))
                unit_title = unit_match.group(2)
                
                # Sanitize for file path
                sanitized_unit = re.sub(r'[<>:"/\\|?*]', '-', unit_name)
                full_path = os.path.join('AP_Statistics_Course', sanitized_unit)
                
                # Insert unit into database
                cursor.execute('''
                INSERT INTO units (unit_number, unit_name, full_path)
                VALUES (?, ?, ?)
                ''', (unit_number, unit_title, full_path))
                
                conn.commit()
                current_unit_id = cursor.lastrowid
                print(f"Added unit: {unit_name}")
        
        # Process topic lines
        elif line.startswith('TOPIC:') and current_unit_id is not None:
            topic = line[6:]  # Remove the 'TOPIC:' prefix
            topic_match = re.match(r'(\d+\.\d+) (.+)', topic)
            
            if topic_match:
                topic_number = topic_match.group(1)
                topic_name = topic_match.group(2)
                
                # Sanitize for file path
                sanitized_topic = re.sub(r'[<>:"/\\|?*]', '-', topic)
                
                # Get the unit path
                cursor.execute('SELECT full_path FROM units WHERE unit_id = ?', (current_unit_id,))
                unit_path = cursor.fetchone()[0]
                
                full_path = os.path.join(unit_path, sanitized_topic)
                
                # Insert topic into database
                cursor.execute('''
                INSERT INTO topics (unit_id, topic_number, topic_name, full_path)
                VALUES (?, ?, ?, ?)
                ''', (current_unit_id, topic_number, topic_name, full_path))
                
                conn.commit()
                print(f"Added topic: {topic}")
    
    # Import problem images
    unit1_path = os.path.join('AP_Statistics_Course', 'Unit 1- Exploring One-Variable Data')
    if not os.path.exists(unit1_path):
        print(f"ERROR: Unit1 folder {unit1_path} not found!")
    else:
        # Get all PNG files in the Unit1 folder
        for file in glob.glob(os.path.join(unit1_path, '*.png')):
            filename = os.path.basename(file)
            # Extract problem info from filename
            year_match = re.search(r'(\d{4})', filename)
            year = year_match.group(1) if year_match else None
            
            # Insert the problem
            cursor.execute('''
                INSERT INTO problems (problem_number, description, source, year)
                VALUES (?, ?, ?, ?)
            ''', (filename, f"Problem from {year} AP Statistics Exam", "AP Statistics Exam", year))
            
            conn.commit()
            print(f"Added problem: {filename}")
    
    # Add problem-topic relationships
    assignments = [
        # Normal Distribution problems (1.10)
        ('2019_AP_MCQ_04.png', '1.10', 1),  # Newborn Baby Sleep Time
        ('2019_AP_MCQ_07.png', '1.10', 1),  # Female Cross-Country Runner Weights
        ('2018_AP_MCQ_10.png', '1.10', 1),  # Egg Carton Weights
        
        # Comparing Distributions (1.9)
        ('2019_AP_MCQ_05.png', '1.9', 1),   # Grain Moisture Dotplots
        ('2018_AP_MCQ_13.png', '1.9', 1),   # Golf Tournament Scores Boxplots
        ('2018_AP_MCQ_18.png', '1.9', 1),   # Sociologist's Boxplots
        
        # Graphical Representations of Summary Statistics (1.8)
        ('2019_AP_MCQ_01.png', '1.8', 1),   # On-Time Airline Arrivals Boxplot
        ('2018_AP_MCQ_18.png', '1.8', 1),   # Sociologist's Boxplots
        
        # Summary Statistics (1.7)
        ('2019_AP_MCQ_11.png', '1.7', 1),   # Nyasha's Financial Literacy Project
        ('2018_AP_MCQ_07.png', '1.7', 1),   # College Football Rushing Yards
        ('2017 apstats exam mcq6.png', '1.7', 1),  # Corn Weights
        
        # Describing Distribution (1.6)
        ('2018_AP_MCQ_15.png', '1.6', 1),   # Marketing Firm Histograms
        ('2018_AP_MCQ_05.png', '1.6', 1),   # New Employee Training
        
        # Representing Categorical Variables with Graphs (1.4)
        ('2019_AP_MCQ_09.png', '1.4', 1),   # Population Pyramids
        
        # Probability (4.3)
        ('2018_AP_MCQ_11.png', '4.3', 4),   # Dog and Cat Ownership
        
        # Sampling Distributions (5.7)
        ('2018_AP_MCQ_12.png', '5.7', 5),   # Sampling Distribution Standard Deviation
    ]
    
    for filename, topic_number, unit_number in assignments:
        # Get the problem ID
        cursor.execute('SELECT problem_id FROM problems WHERE problem_number = ?', (filename,))
        problem_result = cursor.fetchone()
        
        if not problem_result:
            print(f"Problem not found: {filename}")
            continue
        
        problem_id = problem_result[0]
        
        # Get the topic ID
        cursor.execute('''
            SELECT t.topic_id 
            FROM topics t
            JOIN units u ON t.unit_id = u.unit_id
            WHERE t.topic_number = ? AND u.unit_number = ?
        ''', (topic_number, unit_number))
        
        topic_result = cursor.fetchone()
        
        if not topic_result:
            print(f"Topic not found: {topic_number} in Unit {unit_number}")
            continue
        
        topic_id = topic_result[0]
        
        # Create the relationship
        cursor.execute('''
            INSERT INTO problem_topics (problem_id, topic_id, relevance_score, notes)
            VALUES (?, ?, ?, ?)
        ''', (problem_id, topic_id, 5, "Added during database reset"))
        
        conn.commit()
        print(f"Added relationship: {filename} -> {topic_number}")
    
    # Check the results
    cursor.execute('SELECT COUNT(*) FROM units')
    unit_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM topics')
    topic_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM problems')
    problem_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM problem_topics')
    relationship_count = cursor.fetchone()[0]
    
    print(f"\nDatabase reset complete:")
    print(f"  - Units: {unit_count}")
    print(f"  - Topics: {topic_count}")
    print(f"  - Problems: {problem_count}")
    print(f"  - Problem-Topic Relationships: {relationship_count}")
    
    conn.close()

if __name__ == "__main__":
    reset_database() 