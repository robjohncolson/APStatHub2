import os
import sqlite3

def diagnose_database():
    """Check the database and print detailed information."""
    # Check if the database file exists
    db_path = 'ap_stats.db'
    if not os.path.exists(db_path):
        print(f"ERROR: Database file '{db_path}' does not exist!")
        return
    
    print(f"Database file '{db_path}' exists (size: {os.path.getsize(db_path) / 1024:.2f} KB)")
    
    # Connect to the database
    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        print("Successfully connected to the database")
    except Exception as e:
        print(f"ERROR: Failed to connect to the database: {e}")
        return
    
    # Check if the required tables exist
    tables = ['units', 'topics', 'problems', 'problem_topics']
    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"Table '{table}' exists with {count} rows")
        except Exception as e:
            print(f"ERROR: Table '{table}' does not exist or cannot be accessed: {e}")
    
    # Check units
    try:
        cursor.execute("SELECT * FROM units ORDER BY unit_number")
        units = cursor.fetchall()
        print(f"\nUnits ({len(units)}):")
        for unit in units:
            print(f"  - Unit {unit['unit_number']}: {unit['unit_name']} (ID: {unit['unit_id']})")
    except Exception as e:
        print(f"ERROR: Failed to query units: {e}")
    
    # Check topics
    try:
        cursor.execute("""
            SELECT t.*, u.unit_number, u.unit_name 
            FROM topics t
            JOIN units u ON t.unit_id = u.unit_id
            ORDER BY u.unit_number, t.topic_number
        """)
        topics = cursor.fetchall()
        print(f"\nTopics ({len(topics)}):")
        current_unit = None
        for topic in topics:
            if topic['unit_number'] != current_unit:
                print(f"\n  Unit {topic['unit_number']}: {topic['unit_name']}")
                current_unit = topic['unit_number']
            print(f"    - {topic['topic_number']} {topic['topic_name']} (ID: {topic['topic_id']})")
    except Exception as e:
        print(f"ERROR: Failed to query topics: {e}")
    
    # Check problems
    try:
        cursor.execute("SELECT * FROM problems ORDER BY problem_id")
        problems = cursor.fetchall()
        print(f"\nProblems ({len(problems)}):")
        for problem in problems:
            print(f"  - ID: {problem['problem_id']}, Number: {problem['problem_number']}, Year: {problem['year']}")
    except Exception as e:
        print(f"ERROR: Failed to query problems: {e}")
    
    # Check problem-topic relationships
    try:
        cursor.execute("""
            SELECT pt.*, p.problem_number, t.topic_number, t.topic_name, u.unit_number
            FROM problem_topics pt
            JOIN problems p ON pt.problem_id = p.problem_id
            JOIN topics t ON pt.topic_id = t.topic_id
            JOIN units u ON t.unit_id = u.unit_id
            ORDER BY p.problem_id, t.topic_number
        """)
        relationships = cursor.fetchall()
        print(f"\nProblem-Topic Relationships ({len(relationships)}):")
        current_problem_id = None
        for rel in relationships:
            if rel['problem_id'] != current_problem_id:
                print(f"\n  Problem: {rel['problem_number']} (ID: {rel['problem_id']})")
                current_problem_id = rel['problem_id']
            print(f"    - Topic: {rel['topic_number']} {rel['topic_name']} (Unit {rel['unit_number']}, Relevance: {rel['relevance_score']})")
    except Exception as e:
        print(f"ERROR: Failed to query problem-topic relationships: {e}")
    
    # Close the connection
    conn.close()
    print("\nDiagnostic complete")

if __name__ == "__main__":
    diagnose_database() 