#!/usr/bin/env python3
"""
Export script to create a clean JSON file of MCQ problems from the AP Stats database.
This script exports problems in the format expected by the main web application.
"""

import sqlite3
import json
import os
from collections import defaultdict

def connect_to_database(db_path='ap_stats.db'):
    """Connect to the SQLite database and return connection."""
    if not os.path.exists(db_path):
        raise FileNotFoundError(f"Database file '{db_path}' not found.")
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name
    return conn

def get_mcq_problems_data(conn):
    """
    Execute SQL query to get all MCQ problems with their associated topics and units.
    Returns a list of problem data dictionaries.
    """
    
    # SQL query to get all necessary data with JOINs
    query = """
    SELECT DISTINCT
        p.problem_id,
        p.problem_number,
        p.year,
        p.source,
        u.full_path as unit_path,
        t.topic_number
    FROM problems p
    JOIN problem_topics pt ON p.problem_id = pt.problem_id
    JOIN topics t ON pt.topic_id = t.topic_id
    JOIN units u ON t.unit_id = u.unit_id
    WHERE p.problem_number LIKE '%MCQ%'
    ORDER BY p.problem_id, t.topic_number
    """
    
    cursor = conn.cursor()
    cursor.execute(query)
    return cursor.fetchall()

def process_problem_data(raw_data):
    """
    Process the raw database results into the final JSON structure.
    Groups multiple topics per problem and transforms topic numbers.
    """
    
    # Group problems by problem_id since one problem can have multiple topics
    problems_dict = {}
    
    # Process each row from the database
    for row in raw_data:
        problem_id = row['problem_id']
        
        # Initialize problem entry if it doesn't exist
        if problem_id not in problems_dict:
            # Construct the image path by combining unit path and problem filename
            # Convert Windows backslashes to forward slashes for web compatibility
            unit_path = row['unit_path'].replace('\\', '/')
            question_image = f"{unit_path}/{row['problem_number']}"
            
            problems_dict[problem_id] = {
                'problem_data': {
                    'id': problem_id,
                    'questionImage': question_image,
                    'year': row['year'],
                    'source': row['source'] if row['source'] else 'AP Exam'
                },
                'topics': []
            }
        
        # Transform topic number from "X.Y" format to "X-Y" format
        topic_number = row['topic_number']
        linked_lesson_id = topic_number.replace('.', '-')
        
        # Add this topic to the problem's topic list (avoid duplicates)
        if linked_lesson_id not in problems_dict[problem_id]['topics']:
            problems_dict[problem_id]['topics'].append(linked_lesson_id)
    
    # Convert to final format
    final_problems = []
    for problem_id, problem_info in problems_dict.items():
        problem_data = problem_info['problem_data']
        problem_data['linkedLessonIds'] = sorted(problem_info['topics'])  # Sort for consistency
        final_problems.append(problem_data)
    
    # Sort by problem ID for consistent output
    final_problems.sort(key=lambda x: x['id'])
    
    return final_problems

def write_json_export(problems_data, output_file='questions_export.json'):
    """Write the processed problem data to a JSON file with pretty formatting."""
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(problems_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Successfully exported {len(problems_data)} MCQ problems to '{output_file}'")
        print(f"📊 Export Summary:")
        print(f"   - Total MCQ problems: {len(problems_data)}")
        
        # Show some statistics
        total_topics = sum(len(p['linkedLessonIds']) for p in problems_data)
        print(f"   - Total topic associations: {total_topics}")
        print(f"   - Average topics per problem: {total_topics/len(problems_data):.1f}")
        
        # Show year distribution
        year_counts = defaultdict(int)
        for problem in problems_data:
            year_counts[problem['year']] += 1
        
        print(f"   - Year distribution:")
        for year in sorted(year_counts.keys()):
            print(f"     * {year}: {year_counts[year]} problems")
            
    except Exception as e:
        print(f"❌ Error writing to file '{output_file}': {e}")
        raise

def main():
    """Main function to orchestrate the export process."""
    
    print("🚀 Starting AP Stats MCQ Export Process...")
    print("=" * 50)
    
    try:
        # Step 1: Connect to database
        print("📁 Connecting to database...")
        conn = connect_to_database()
        
        # Step 2: Get MCQ problems data
        print("🔍 Querying MCQ problems from database...")
        raw_data = get_mcq_problems_data(conn)
        print(f"   Found {len(raw_data)} problem-topic associations")
        
        # Step 3: Process the data
        print("⚙️  Processing and structuring data...")
        processed_problems = process_problem_data(raw_data)
        
        # Step 4: Write to JSON file
        print("💾 Writing export file...")
        write_json_export(processed_problems)
        
        # Step 5: Show sample output
        print("\n📋 Sample of exported data:")
        if processed_problems:
            sample = processed_problems[0]
            print(f"   Problem ID: {sample['id']}")
            print(f"   Image: {sample['questionImage']}")
            print(f"   Year: {sample['year']}")
            print(f"   Topics: {sample['linkedLessonIds']}")
        
        print("\n✨ Export completed successfully!")
        
    except Exception as e:
        print(f"❌ Export failed: {e}")
        raise
    
    finally:
        # Close database connection
        if 'conn' in locals():
            conn.close()
            print("📝 Database connection closed.")

if __name__ == "__main__":
    main() 