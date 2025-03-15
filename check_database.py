import os
import sqlite3
import re
import glob

def get_db_connection():
    """Connect to the SQLite database."""
    conn = sqlite3.connect('ap_stats.db')
    conn.row_factory = sqlite3.Row
    return conn

def list_all_problems():
    """List all problems in the database."""
    conn = get_db_connection()
    problems = conn.execute('SELECT * FROM problems ORDER BY problem_id').fetchall()
    
    print(f"\n=== Problems in Database ({len(problems)}) ===")
    for problem in problems:
        print(f"ID: {problem['problem_id']}, Number: {problem['problem_number']}, Year: {problem['year']}")
    
    conn.close()

def list_all_problem_topic_relationships():
    """List all problem-topic relationships in the database."""
    conn = get_db_connection()
    relationships = conn.execute('''
        SELECT pt.id, p.problem_id, p.problem_number, t.topic_id, t.topic_number, t.topic_name, u.unit_number, pt.relevance_score
        FROM problem_topics pt
        JOIN problems p ON pt.problem_id = p.problem_id
        JOIN topics t ON pt.topic_id = t.topic_id
        JOIN units u ON t.unit_id = u.unit_id
        ORDER BY p.problem_id, t.topic_number
    ''').fetchall()
    
    print(f"\n=== Problem-Topic Relationships ({len(relationships)}) ===")
    current_problem_id = None
    for rel in relationships:
        if rel['problem_id'] != current_problem_id:
            print(f"\nProblem: {rel['problem_number']} (ID: {rel['problem_id']})")
            current_problem_id = rel['problem_id']
        
        print(f"  - Topic: {rel['topic_number']} {rel['topic_name']} (Unit {rel['unit_number']}, Relevance: {rel['relevance_score']})")
    
    conn.close()

def list_all_topics():
    """List all topics in the database."""
    conn = get_db_connection()
    topics = conn.execute('''
        SELECT t.topic_id, t.topic_number, t.topic_name, u.unit_number, u.unit_name
        FROM topics t
        JOIN units u ON t.unit_id = u.unit_id
        ORDER BY u.unit_number, t.topic_number
    ''').fetchall()
    
    print(f"\n=== Topics in Database ({len(topics)}) ===")
    current_unit = None
    for topic in topics:
        if topic['unit_number'] != current_unit:
            print(f"\nUnit {topic['unit_number']}: {topic['unit_name']}")
            current_unit = topic['unit_number']
        
        print(f"  - ID: {topic['topic_id']}, {topic['topic_number']} {topic['topic_name']}")
    
    conn.close()

def manually_assign_topic():
    """Manually assign a topic to a problem."""
    conn = get_db_connection()
    
    # List all problems
    problems = conn.execute('SELECT * FROM problems ORDER BY problem_number').fetchall()
    print("\n=== Available Problems ===")
    for i, problem in enumerate(problems):
        print(f"{i+1}. {problem['problem_number']} (ID: {problem['problem_id']})")
    
    # Select a problem
    problem_idx = int(input("\nSelect a problem (number): ")) - 1
    if problem_idx < 0 or problem_idx >= len(problems):
        print("Invalid selection")
        conn.close()
        return
    
    selected_problem = problems[problem_idx]
    
    # List all topics
    topics = conn.execute('''
        SELECT t.topic_id, t.topic_number, t.topic_name, u.unit_number, u.unit_name
        FROM topics t
        JOIN units u ON t.unit_id = u.unit_id
        ORDER BY u.unit_number, t.topic_number
    ''').fetchall()
    
    print("\n=== Available Topics ===")
    for i, topic in enumerate(topics):
        print(f"{i+1}. Unit {topic['unit_number']}: {topic['topic_number']} {topic['topic_name']}")
    
    # Select a topic
    topic_idx = int(input("\nSelect a topic (number): ")) - 1
    if topic_idx < 0 or topic_idx >= len(topics):
        print("Invalid selection")
        conn.close()
        return
    
    selected_topic = topics[topic_idx]
    
    # Check if relationship already exists
    existing = conn.execute('''
        SELECT * FROM problem_topics 
        WHERE problem_id = ? AND topic_id = ?
    ''', (selected_problem['problem_id'], selected_topic['topic_id'])).fetchone()
    
    if existing:
        print(f"This relationship already exists!")
        conn.close()
        return
    
    # Get relevance score
    relevance_score = int(input("\nEnter relevance score (1-5): "))
    if relevance_score < 1 or relevance_score > 5:
        relevance_score = 5  # Default to high relevance
    
    # Get notes
    notes = input("\nEnter notes (optional): ")
    
    # Create the relationship
    conn.execute('''
        INSERT INTO problem_topics (problem_id, topic_id, relevance_score, notes)
        VALUES (?, ?, ?, ?)
    ''', (selected_problem['problem_id'], selected_topic['topic_id'], relevance_score, notes))
    
    conn.commit()
    print(f"\nSuccessfully linked problem {selected_problem['problem_number']} to topic {selected_topic['topic_number']}")
    
    conn.close()

def fix_missing_relationships():
    """Fix missing relationships by checking the Assignations-Unit1.md file."""
    print("\nAttempting to fix missing relationships...")
    
    # First, run the import_assignments.py script
    try:
        import import_assignments
        import_assignments.import_assignments_from_markdown()
    except Exception as e:
        print(f"Error running import_assignments.py: {e}")
    
    # Then, run the update_problem_references.py script
    try:
        import update_problem_references
        update_problem_references.update_problem_references()
    except Exception as e:
        print(f"Error running update_problem_references.py: {e}")
    
    print("\nFix attempt completed.")

def main():
    while True:
        print("\n=== Database Check Tool ===")
        print("1. List all problems")
        print("2. List all problem-topic relationships")
        print("3. List all topics")
        print("4. Manually assign a topic to a problem")
        print("5. Fix missing relationships")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ")
        
        if choice == '1':
            list_all_problems()
        elif choice == '2':
            list_all_problem_topic_relationships()
        elif choice == '3':
            list_all_topics()
        elif choice == '4':
            manually_assign_topic()
        elif choice == '5':
            fix_missing_relationships()
        elif choice == '6':
            break
        else:
            print("Invalid choice")

if __name__ == "__main__":
    main() 