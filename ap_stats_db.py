import os
import sqlite3
import re

class APStatsDatabase:
    def __init__(self, db_name='ap_stats.db'):
        """Initialize the database connection and create tables if they don't exist."""
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_tables()
    
    def create_tables(self):
        """Create the necessary tables for the AP Statistics database."""
        # Units table
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS units (
            unit_id INTEGER PRIMARY KEY,
            unit_number INTEGER,
            unit_name TEXT,
            full_path TEXT
        )
        ''')
        
        # Topics table
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS topics (
            topic_id INTEGER PRIMARY KEY,
            unit_id INTEGER,
            topic_number TEXT,
            topic_name TEXT,
            full_path TEXT,
            FOREIGN KEY (unit_id) REFERENCES units (unit_id)
        )
        ''')
        
        # Problems table
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS problems (
            problem_id INTEGER PRIMARY KEY,
            problem_number TEXT,
            description TEXT,
            source TEXT,
            year INTEGER,
            difficulty INTEGER
        )
        ''')
        
        # Problem-Topic relationship table (many-to-many)
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS problem_topics (
            id INTEGER PRIMARY KEY,
            problem_id INTEGER,
            topic_id INTEGER,
            relevance_score INTEGER,
            notes TEXT,
            FOREIGN KEY (problem_id) REFERENCES problems (problem_id),
            FOREIGN KEY (topic_id) REFERENCES topics (topic_id)
        )
        ''')
        
        self.conn.commit()
    
    def import_knowledge_tree(self, tree_file='APStats-StructuredTree.txt'):
        """Import the knowledge tree structure from the structured file."""
        if not os.path.exists(tree_file):
            print(f"Error: File {tree_file} not found.")
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
                    self.cursor.execute('''
                    INSERT INTO units (unit_number, unit_name, full_path)
                    VALUES (?, ?, ?)
                    ''', (unit_number, unit_title, full_path))
                    
                    self.conn.commit()
                    current_unit_id = self.cursor.lastrowid
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
                    sanitized_unit = self.get_unit_path(current_unit_id)
                    if sanitized_unit:
                        full_path = os.path.join(sanitized_unit, sanitized_topic)
                        
                        # Insert topic into database
                        self.cursor.execute('''
                        INSERT INTO topics (unit_id, topic_number, topic_name, full_path)
                        VALUES (?, ?, ?, ?)
                        ''', (current_unit_id, topic_number, topic_name, full_path))
                        
                        self.conn.commit()
                        print(f"Added topic: {topic}")
    
    def get_unit_path(self, unit_id):
        """Get the full path for a unit by its ID."""
        self.cursor.execute('SELECT full_path FROM units WHERE unit_id = ?', (unit_id,))
        result = self.cursor.fetchone()
        return result[0] if result else None
    
    def import_assignments_from_markdown(self, markdown_file):
        """Import problem assignments from a markdown file."""
        if not os.path.exists(markdown_file):
            print(f"Error: File {markdown_file} not found.")
            return
        
        with open(markdown_file, 'r') as file:
            content = file.read()
        
        # Extract problem assignments
        # This is a simplified parser - you may need to adjust based on your markdown format
        problem_sections = re.split(r'\d+\.\s', content)[1:]  # Split by numbered items
        
        for i, section in enumerate(problem_sections, 1):
            # Extract problem description (first paragraph)
            description_match = re.match(r'([^\.]+\.)', section.strip())
            description = description_match.group(1) if description_match else f"Problem {i}"
            
            # Extract branch information
            branch_match = re.search(r'Branch:\s+(Unit \d+:[^\\n]+)', section)
            sub_branch_match = re.search(r'Sub-Branch:\s+([^\\n]+)', section)
            
            if branch_match:
                unit_name = branch_match.group(1).strip()
                # Find the unit in the database
                unit_number = int(re.search(r'Unit (\d+)', unit_name).group(1))
                self.cursor.execute('SELECT unit_id FROM units WHERE unit_number = ?', (unit_number,))
                unit_id = self.cursor.fetchone()
                
                if unit_id:
                    unit_id = unit_id[0]
                    
                    # Add the problem to the database
                    self.cursor.execute('''
                    INSERT INTO problems (problem_number, description, source)
                    VALUES (?, ?, ?)
                    ''', (f"Problem {i}", description, markdown_file))
                    
                    self.conn.commit()
                    problem_id = self.cursor.lastrowid
                    
                    # Process sub-branches (topics)
                    if sub_branch_match:
                        sub_branches = sub_branch_match.group(1).split(',')
                        for sub_branch in sub_branches:
                            sub_branch = sub_branch.strip()
                            topic_number_match = re.search(r'(\d+\.\d+)', sub_branch)
                            
                            if topic_number_match:
                                topic_number = topic_number_match.group(1)
                                
                                # Find the topic in the database
                                self.cursor.execute('''
                                SELECT topic_id FROM topics 
                                WHERE topic_number = ? AND unit_id = ?
                                ''', (topic_number, unit_id))
                                
                                topic_id = self.cursor.fetchone()
                                
                                if topic_id:
                                    topic_id = topic_id[0]
                                    
                                    # Create the problem-topic relationship
                                    self.cursor.execute('''
                                    INSERT INTO problem_topics (problem_id, topic_id, relevance_score)
                                    VALUES (?, ?, ?)
                                    ''', (problem_id, topic_id, 5))  # Default high relevance
                                    
                                    self.conn.commit()
                                    print(f"Linked Problem {i} to topic {topic_number}")
    
    def list_problems_by_topic(self, topic_number):
        """List all problems associated with a specific topic."""
        self.cursor.execute('''
        SELECT p.problem_id, p.problem_number, p.description, t.topic_number, t.topic_name
        FROM problems p
        JOIN problem_topics pt ON p.problem_id = pt.problem_id
        JOIN topics t ON pt.topic_id = t.topic_id
        WHERE t.topic_number = ?
        ''', (topic_number,))
        
        results = self.cursor.fetchall()
        
        if results:
            print(f"\nProblems for topic {topic_number}:")
            for row in results:
                print(f"  - {row[1]}: {row[2]}")
        else:
            print(f"No problems found for topic {topic_number}")
    
    def list_topics_by_problem(self, problem_id):
        """List all topics associated with a specific problem."""
        self.cursor.execute('''
        SELECT p.problem_number, p.description, t.topic_number, t.topic_name, u.unit_name
        FROM problems p
        JOIN problem_topics pt ON p.problem_id = pt.problem_id
        JOIN topics t ON pt.topic_id = t.topic_id
        JOIN units u ON t.unit_id = u.unit_id
        WHERE p.problem_id = ?
        ''', (problem_id,))
        
        results = self.cursor.fetchall()
        
        if results:
            problem_info = results[0]
            print(f"\nTopics for {problem_info[0]}: {problem_info[1]}")
            for row in results:
                print(f"  - {row[2]} {row[3]} (Unit: {row[4]})")
        else:
            print(f"No topics found for problem ID {problem_id}")
    
    def close(self):
        """Close the database connection."""
        self.conn.close()


def main():
    # Create and initialize the database
    db = APStatsDatabase()
    
    # Import the knowledge tree structure
    db.import_knowledge_tree()
    
    # Import assignments from markdown file if it exists
    assignments_file = os.path.join('AP_Statistics_Course', 'Unit 1- Exploring One-Variable Data', 'Assignations-Unit1.md')
    if os.path.exists(assignments_file):
        db.import_assignments_from_markdown(assignments_file)
    
    # Example queries
    print("\nExample queries:")
    db.list_problems_by_topic('1.10')  # List problems for Normal Distribution
    db.list_topics_by_problem(1)       # List topics for the first problem
    
    # Close the database connection
    db.close()


if __name__ == "__main__":
    main() 