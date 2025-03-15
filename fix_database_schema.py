import sqlite3
import os

def fix_database_schema():
    """Add missing columns to the problems table and verify they exist."""
    print("Starting database schema fix...")
    
    # Check if database exists
    if not os.path.exists('ap_stats.db'):
        print("Error: Database file 'ap_stats.db' not found!")
        return False
    
    try:
        # Connect to the database
        conn = sqlite3.connect('ap_stats.db')
        cursor = conn.cursor()
        
        # Check if the columns already exist
        cursor.execute("PRAGMA table_info(problems)")
        columns = [column[1] for column in cursor.fetchall()]
        print(f"Current columns in problems table: {columns}")
        
        # Add problem_type column if it doesn't exist
        if 'problem_type' not in columns:
            print("Adding 'problem_type' column...")
            cursor.execute("ALTER TABLE problems ADD COLUMN problem_type TEXT")
            conn.commit()
        else:
            print("Column 'problem_type' already exists.")
        
        # Add problem_num column if it doesn't exist
        if 'problem_num' not in columns:
            print("Adding 'problem_num' column...")
            cursor.execute("ALTER TABLE problems ADD COLUMN problem_num TEXT")
            conn.commit()
        else:
            print("Column 'problem_num' already exists.")
        
        # Verify the columns were added
        cursor.execute("PRAGMA table_info(problems)")
        updated_columns = [column[1] for column in cursor.fetchall()]
        print(f"Updated columns in problems table: {updated_columns}")
        
        # Initialize the columns with values extracted from filenames
        print("Initializing problem_type and problem_num values from filenames...")
        cursor.execute("SELECT problem_id, problem_number FROM problems")
        problems = cursor.fetchall()
        
        for problem_id, filename in problems:
            # Extract problem type
            if 'MCQ' in filename:
                problem_type = 'Multiple Choice'
            elif 'FRQ' in filename or 'Frq' in filename:
                problem_type = 'Free Response'
            else:
                problem_type = 'Unknown'
            
            # Extract problem number
            import re
            num_match = re.search(r'(?:MCQ|FRQ|Frq)(\d+)', filename)
            problem_num = num_match.group(1) if num_match else ""
            
            # Update the record
            cursor.execute(
                "UPDATE problems SET problem_type = ?, problem_num = ? WHERE problem_id = ?",
                (problem_type, problem_num, problem_id)
            )
        
        conn.commit()
        print("Database schema update completed successfully!")
        
        # Show some sample data to verify
        cursor.execute("SELECT problem_id, problem_number, problem_type, problem_num FROM problems LIMIT 5")
        sample_data = cursor.fetchall()
        print("\nSample data after update:")
        for row in sample_data:
            print(f"  ID: {row[0]}, Filename: {row[1]}, Type: {row[2]}, Number: {row[3]}")
        
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    fix_database_schema() 