import os
import sqlite3
import re

def get_db_connection():
    """Connect to the SQLite database."""
    conn = sqlite3.connect('ap_stats.db')
    conn.row_factory = sqlite3.Row
    return conn

def direct_fix():
    """Directly add topic assignments for specific problems."""
    conn = get_db_connection()
    
    # Define the assignments based on the Assignations-Unit1.md file
    # Format: (problem_filename, topic_number, unit_number)
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
    
    # Process each assignment
    for filename, topic_number, unit_number in assignments:
        # Get the problem from the database
        problem = conn.execute('SELECT * FROM problems WHERE problem_number = ?', (filename,)).fetchone()
        
        if not problem:
            print(f"Problem not found: {filename}")
            continue
        
        # Get the topic from the database
        topic = conn.execute('''
            SELECT * FROM topics 
            WHERE topic_number = ? AND unit_id IN (SELECT unit_id FROM units WHERE unit_number = ?)
        ''', (topic_number, unit_number)).fetchone()
        
        if not topic:
            print(f"Topic not found: {topic_number} in Unit {unit_number}")
            continue
        
        # Check if relationship already exists
        existing = conn.execute('''
            SELECT * FROM problem_topics 
            WHERE problem_id = ? AND topic_id = ?
        ''', (problem['problem_id'], topic['topic_id'])).fetchone()
        
        if existing:
            print(f"Relationship already exists: {filename} -> {topic_number}")
            continue
        
        # Create the relationship
        conn.execute('''
            INSERT INTO problem_topics (problem_id, topic_id, relevance_score, notes)
            VALUES (?, ?, ?, ?)
        ''', (problem['problem_id'], topic['topic_id'], 5, "Added by direct_fix.py"))
        
        conn.commit()
        print(f"Added relationship: {filename} -> {topic_number}")
    
    # Check the results
    relationships = conn.execute('''
        SELECT COUNT(*) as count FROM problem_topics
    ''').fetchone()
    
    print(f"\nTotal problem-topic relationships: {relationships['count']}")
    
    conn.close()

if __name__ == "__main__":
    direct_fix() 