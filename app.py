from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
import sqlite3
import os
import re
import glob

app = Flask(__name__)
app.secret_key = 'apstats_secret_key'  # For flash messages

# Database connection helper
def get_db_connection():
    conn = sqlite3.connect('ap_stats.db')
    conn.row_factory = sqlite3.Row  # This enables column access by name
    return conn

# Function to get all problem images from Unit1 folder
def get_problem_images():
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
        
        # Extract part number for FRQs (e.g., FRQ1-2 would be part 2 of question 1)
        part_match = re.search(r'(?:FRQ|Frq)(\d+)-(\d+)', filename)
        part_num = part_match.group(2) if part_match else "1"
        
        # Create a group identifier for related FRQ parts
        group_id = None
        if problem_type == 'Free Response' and num_match:
            # Group identifier: year_FRQ_number (e.g., 2019_FRQ_1)
            group_id = f"{year}_FRQ_{problem_num}"
        
        image_files.append({
            'filename': filename,
            'path': file,
            'year': year,
            'type': problem_type,
            'number': problem_num,
            'part': part_num,
            'group_id': group_id,
            'display_name': f"{year} {problem_type} #{problem_num}" + (f" (Part {part_num})" if part_match else "")
        })
    
    # Sort by year, then by problem number, then by part number
    image_files.sort(key=lambda x: (
        x['year'], 
        x['type'], 
        int(x['number']) if x['number'].isdigit() else 999,
        int(x['part']) if x['part'].isdigit() else 1
    ))
    
    return image_files

# Function to group related FRQ images
def group_problem_images(problem_images):
    # Group problems by their group_id
    grouped_problems = {}
    standalone_problems = []
    
    for problem in problem_images:
        if problem['group_id']:
            if problem['group_id'] not in grouped_problems:
                grouped_problems[problem['group_id']] = {
                    'group_id': problem['group_id'],
                    'year': problem['year'],
                    'type': problem['type'],
                    'number': problem['number'],
                    'display_name': f"{problem['year']} {problem['type']} #{problem['number']}",
                    'parts': []
                }
            grouped_problems[problem['group_id']]['parts'].append(problem)
        else:
            standalone_problems.append(problem)
    
    return grouped_problems, standalone_problems

@app.route('/')
def index():
    """Home page showing problems with images."""
    # Get all problem images
    problem_images = get_problem_images()
    
    # Group related FRQ images
    grouped_problems, standalone_problems = group_problem_images(problem_images)
    
    # Connect to database to check which problems have topics assigned
    conn = get_db_connection()
    
    # Get all problems with their topic counts
    problem_topics = {}
    problems_data = conn.execute('''
        SELECT p.problem_number, COUNT(pt.id) as topic_count
        FROM problems p
        LEFT JOIN problem_topics pt ON p.problem_id = pt.problem_id
        GROUP BY p.problem_id
    ''').fetchall()
    
    # Create a dictionary mapping problem_number to topic count
    for problem in problems_data:
        problem_topics[problem['problem_number']] = problem['topic_count']
    
    conn.close()
    
    # Add topic count to each standalone problem
    for problem in standalone_problems:
        problem['has_topics'] = problem_topics.get(problem['filename'], 0) > 0
        problem['topic_count'] = problem_topics.get(problem['filename'], 0)
    
    # Add topic information to grouped problems
    for group_id, group in grouped_problems.items():
        # Check if any part of the group has topics
        group_has_topics = False
        total_topic_count = 0
        
        for part in group['parts']:
            part_topic_count = problem_topics.get(part['filename'], 0)
            if part_topic_count > 0:
                group_has_topics = True
                total_topic_count += part_topic_count
            
            # Also add to individual parts
            part['has_topics'] = part_topic_count > 0
            part['topic_count'] = part_topic_count
        
        group['has_topics'] = group_has_topics
        group['topic_count'] = total_topic_count
    
    # Group problems by year
    problems_by_year = {}
    
    # Add standalone problems
    for problem in standalone_problems:
        year = problem['year']
        if year not in problems_by_year:
            problems_by_year[year] = {'standalone': [], 'groups': []}
        problems_by_year[year]['standalone'].append(problem)
    
    # Add grouped problems
    for group_id, group in grouped_problems.items():
        year = group['year']
        if year not in problems_by_year:
            problems_by_year[year] = {'standalone': [], 'groups': []}
        problems_by_year[year]['groups'].append(group)
    
    # Sort years in descending order (most recent first)
    sorted_years = sorted(problems_by_year.keys(), reverse=True)
    
    return render_template('index.html', 
                          problems_by_year=problems_by_year, 
                          years=sorted_years,
                          grouped_problems=grouped_problems)

@app.route('/images/<path:filename>')
def serve_image(filename):
    """Serve images from the Unit1 folder."""
    unit1_path = os.path.join('AP_Statistics_Course', 'Unit 1- Exploring One-Variable Data')
    return send_from_directory(unit1_path, filename)

@app.route('/problem/<path:filename>')
def problem_detail(filename):
    """Show details for a specific problem, including related topics."""
    # Get the problem image
    unit1_path = os.path.join('AP_Statistics_Course', 'Unit 1- Exploring One-Variable Data')
    full_path = os.path.join(unit1_path, filename)
    
    if not os.path.exists(full_path):
        flash('Problem image not found!')
        return redirect(url_for('index'))
    
    # Check if this problem exists in the database
    conn = get_db_connection()
    problem = conn.execute('SELECT * FROM problems WHERE problem_number = ?', (filename,)).fetchone()
    
    # If not in database, create a new entry
    if not problem:
        # Extract problem info from filename
        year_match = re.search(r'(\d{4})', filename)
        year = year_match.group(1) if year_match else None
        
        conn.execute('''
            INSERT INTO problems (problem_number, description, source, year)
            VALUES (?, ?, ?, ?)
        ''', (filename, f"Problem from {year} AP Statistics Exam", "AP Statistics Exam", year))
        
        conn.commit()
        problem = conn.execute('SELECT * FROM problems WHERE problem_number = ?', (filename,)).fetchone()
    
    # Get topics related to this problem
    topics = conn.execute('''
        SELECT t.*, u.unit_number, u.unit_name, pt.relevance_score, pt.notes
        FROM topics t
        JOIN units u ON t.unit_id = u.unit_id
        JOIN problem_topics pt ON t.topic_id = pt.topic_id
        WHERE pt.problem_id = ?
        ORDER BY u.unit_number, t.topic_number
    ''', (problem['problem_id'],)).fetchall()
    
    # Get all topics for adding new relationships
    all_topics = conn.execute('''
        SELECT t.*, u.unit_number, u.unit_name
        FROM topics t
        JOIN units u ON t.unit_id = u.unit_id
        ORDER BY u.unit_number, t.topic_number
    ''').fetchall()
    
    # Check if this is part of an FRQ group
    is_frq = 'FRQ' in filename or 'Frq' in filename
    group_id = None
    group_parts = []
    
    if is_frq:
        # Extract year and FRQ number to form group_id
        year_match = re.search(r'(\d{4})', filename)
        num_match = re.search(r'(?:FRQ|Frq)(\d+)', filename)
        
        if year_match and num_match:
            year = year_match.group(1)
            frq_num = num_match.group(1)
            group_id = f"{year}_FRQ_{frq_num}"
            
            # Find all parts of this FRQ
            part_pattern = f"{year}.*(?:FRQ|Frq){frq_num}"
            group_parts = conn.execute('''
                SELECT * FROM problems 
                WHERE problem_number LIKE ? AND problem_number != ?
                ORDER BY problem_number
            ''', (f"%{part_pattern}%", filename)).fetchall()
    
    conn.close()
    
    # Extract year and problem type for display
    year_match = re.search(r'(\d{4})', filename)
    year = year_match.group(1) if year_match else "Unknown"
    
    if 'MCQ' in filename:
        problem_type = 'Multiple Choice'
    elif 'FRQ' in filename or 'Frq' in filename:
        problem_type = 'Free Response'
    else:
        problem_type = 'Unknown'
    
    num_match = re.search(r'(?:MCQ|FRQ|Frq)(\d+)', filename)
    problem_num = num_match.group(1) if num_match else ""
    
    # Extract part number for FRQs
    part_match = re.search(r'(?:FRQ|Frq)(\d+)-(\d+)', filename)
    part_num = part_match.group(2) if part_match else ""
    
    display_name = f"{year} {problem_type} #{problem_num}" + (f" (Part {part_num})" if part_match else "")
    
    return render_template('problem.html', 
                          problem=problem, 
                          topics=topics, 
                          all_topics=all_topics,
                          filename=filename,
                          display_name=display_name,
                          is_frq=is_frq,
                          group_id=group_id,
                          group_parts=group_parts)

@app.route('/add_problem_topic', methods=['POST'])
def add_problem_topic():
    """Add a topic relationship to an existing problem."""
    problem_id = request.form['problem_id']
    topic_id = request.form['topic_id']
    relevance_score = request.form.get('relevance_score', 5)
    notes = request.form.get('notes', '')
    apply_to_group = request.form.get('apply_to_group') == 'on'
    
    conn = get_db_connection()
    
    # Get the problem to check if it's part of a group
    problem = conn.execute('SELECT * FROM problems WHERE problem_id = ?', (problem_id,)).fetchone()
    
    if not problem:
        flash('Problem not found!')
        return redirect(url_for('index'))
    
    # Check if this is part of an FRQ group
    group_parts = []
    if apply_to_group and ('FRQ' in problem['problem_number'] or 'Frq' in problem['problem_number']):
        # Extract year and FRQ number
        year_match = re.search(r'(\d{4})', problem['problem_number'])
        num_match = re.search(r'(?:FRQ|Frq)(\d+)', problem['problem_number'])
        
        if year_match and num_match:
            year = year_match.group(1)
            frq_num = num_match.group(1)
            
            # Find all parts of this FRQ
            part_pattern = f"{year}.*(?:FRQ|Frq){frq_num}"
            group_parts = conn.execute('''
                SELECT * FROM problems 
                WHERE problem_number LIKE ?
                ORDER BY problem_number
            ''', (f"%{part_pattern}%",)).fetchall()
    
    # If applying to a group, add the topic to all parts
    if apply_to_group and group_parts:
        for part in group_parts:
            # Check if relationship already exists
            existing = conn.execute('''
                SELECT * FROM problem_topics 
                WHERE problem_id = ? AND topic_id = ?
            ''', (part['problem_id'], topic_id)).fetchone()
            
            if not existing:
                conn.execute('''
                    INSERT INTO problem_topics (problem_id, topic_id, relevance_score, notes)
                    VALUES (?, ?, ?, ?)
                ''', (part['problem_id'], topic_id, relevance_score, notes))
        
        conn.commit()
        flash(f'Topic added to all parts of FRQ #{num_match.group(1)} successfully!')
    else:
        # Check if relationship already exists
        existing = conn.execute('''
            SELECT * FROM problem_topics 
            WHERE problem_id = ? AND topic_id = ?
        ''', (problem_id, topic_id)).fetchone()
        
        if existing:
            flash('This topic is already linked to the problem!')
        else:
            conn.execute('''
                INSERT INTO problem_topics (problem_id, topic_id, relevance_score, notes)
                VALUES (?, ?, ?, ?)
            ''', (problem_id, topic_id, relevance_score, notes))
            
            conn.commit()
            flash('Topic added to problem successfully!')
    
    conn.close()
    
    return redirect(url_for('problem_detail', filename=problem['problem_number']))

@app.route('/remove_problem_topic', methods=['POST'])
def remove_problem_topic():
    """Remove a topic relationship from a problem."""
    problem_id = request.form['problem_id']
    topic_id = request.form['topic_id']
    remove_from_group = request.form.get('remove_from_group') == 'on'
    
    conn = get_db_connection()
    
    # Get the problem to check if it's part of a group
    problem = conn.execute('SELECT * FROM problems WHERE problem_id = ?', (problem_id,)).fetchone()
    
    if not problem:
        flash('Problem not found!')
        return redirect(url_for('index'))
    
    # Check if this is part of an FRQ group
    group_parts = []
    if remove_from_group and ('FRQ' in problem['problem_number'] or 'Frq' in problem['problem_number']):
        # Extract year and FRQ number
        year_match = re.search(r'(\d{4})', problem['problem_number'])
        num_match = re.search(r'(?:FRQ|Frq)(\d+)', problem['problem_number'])
        
        if year_match and num_match:
            year = year_match.group(1)
            frq_num = num_match.group(1)
            
            # Find all parts of this FRQ
            part_pattern = f"{year}.*(?:FRQ|Frq){frq_num}"
            group_parts = conn.execute('''
                SELECT * FROM problems 
                WHERE problem_number LIKE ?
                ORDER BY problem_number
            ''', (f"%{part_pattern}%",)).fetchall()
    
    # If removing from a group, remove the topic from all parts
    if remove_from_group and group_parts:
        for part in group_parts:
            conn.execute('''
                DELETE FROM problem_topics 
                WHERE problem_id = ? AND topic_id = ?
            ''', (part['problem_id'], topic_id))
        
        conn.commit()
        flash(f'Topic removed from all parts of FRQ #{num_match.group(1)} successfully!')
    else:
        conn.execute('''
            DELETE FROM problem_topics 
            WHERE problem_id = ? AND topic_id = ?
        ''', (problem_id, topic_id))
        
        conn.commit()
        flash('Topic removed from problem successfully!')
    
    conn.close()
    
    return redirect(url_for('problem_detail', filename=problem['problem_number']))

@app.route('/topics')
def topics():
    """Page showing all topics in the knowledge tree."""
    conn = get_db_connection()
    
    # Get all units
    units = conn.execute('SELECT * FROM units ORDER BY unit_number').fetchall()
    
    # Get topics for each unit
    units_with_topics = []
    for unit in units:
        topics = conn.execute(
            'SELECT * FROM topics WHERE unit_id = ? ORDER BY topic_number', 
            (unit['unit_id'],)
        ).fetchall()
        units_with_topics.append({
            'unit': unit,
            'topics': topics
        })
    
    conn.close()
    return render_template('topics.html', units_with_topics=units_with_topics)

@app.route('/topic/<topic_id>')
def topic_detail(topic_id):
    """Show details for a specific topic, including related problems."""
    conn = get_db_connection()
    
    # Get topic details
    topic = conn.execute('SELECT * FROM topics WHERE topic_id = ?', (topic_id,)).fetchone()
    
    if not topic:
        flash('Topic not found!')
        return redirect(url_for('topics'))
    
    # Get unit information
    unit = conn.execute('SELECT * FROM units WHERE unit_id = ?', (topic['unit_id'],)).fetchone()
    
    # Get problems related to this topic
    problems = conn.execute('''
        SELECT p.*, pt.relevance_score, pt.notes
        FROM problems p
        JOIN problem_topics pt ON p.problem_id = pt.problem_id
        WHERE pt.topic_id = ?
        ORDER BY p.year DESC, p.problem_number
    ''', (topic_id,)).fetchall()
    
    conn.close()
    return render_template('topic.html', topic=topic, unit=unit, problems=problems)

@app.route('/search', methods=['GET'])
def search():
    """Search for problems or topics."""
    query = request.args.get('query', '')
    
    if not query:
        return render_template('search.html', results=None)
    
    conn = get_db_connection()
    
    # Search problems
    problems = conn.execute('''
        SELECT * FROM problems
        WHERE problem_number LIKE ? OR description LIKE ?
    ''', (f'%{query}%', f'%{query}%')).fetchall()
    
    # Search topics
    topics = conn.execute('''
        SELECT t.*, u.unit_number, u.unit_name
        FROM topics t
        JOIN units u ON t.unit_id = u.unit_id
        WHERE t.topic_number LIKE ? OR t.topic_name LIKE ?
        ORDER BY u.unit_number, t.topic_number
    ''', (f'%{query}%', f'%{query}%')).fetchall()
    
    conn.close()
    
    return render_template('search.html', 
                          query=query, 
                          problems=problems, 
                          topics=topics)

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    # Create the necessary template files if they don't exist
    template_files = {
        'index.html': '''
        <!DOCTYPE html>
        <html>
        <head>
            <title>AP Statistics Problems</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
            <style>
                .problem-card { margin-bottom: 15px; }
                .problem-image { max-width: 100%; height: auto; }
                .card-with-topics { border: 2px solid #28a745; }
                .card-no-topics { border: 2px solid #dc3545; }
                .topic-badge { position: absolute; top: 10px; right: 10px; }
                .group-card { background-color: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
                .group-header { margin-bottom: 15px; border-bottom: 1px solid #dee2e6; padding-bottom: 10px; }
                .group-parts { display: flex; flex-wrap: wrap; }
                .part-card { flex: 0 0 calc(33.333% - 10px); margin: 5px; }
            </style>
        </head>
        <body>
            <div class="container mt-4">
                <h1>AP Statistics Problems</h1>
                
                <div class="row mb-4">
                    <div class="col">
                        <a href="{{ url_for('topics') }}" class="btn btn-primary">View Knowledge Tree</a>
                        <a href="{{ url_for('search') }}" class="btn btn-secondary">Search</a>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col">
                        <div class="alert alert-info">
                            <strong>Legend:</strong>
                            <span class="badge bg-success">YES</span> Problem has topics assigned
                            <span class="badge bg-danger">NO</span> Problem has no topics assigned
                        </div>
                    </div>
                </div>
                
                {% for flash_message in get_flashed_messages() %}
                <div class="alert alert-info">{{ flash_message }}</div>
                {% endfor %}
                
                {% for year in years %}
                <h2>{{ year }} AP Statistics Exam</h2>
                
                <!-- Display grouped FRQ problems -->
                {% if problems_by_year[year].groups %}
                <h3>Free Response Questions</h3>
                {% for group in problems_by_year[year].groups %}
                <div class="group-card {% if group.has_topics %}card-with-topics{% else %}card-no-topics{% endif %}">
                    <div class="group-header d-flex justify-content-between align-items-center">
                        <h4>{{ group.display_name }}</h4>
                        {% if group.has_topics %}
                        <span class="badge bg-success">YES - {{ group.topic_count }} topic(s)</span>
                        {% else %}
                        <span class="badge bg-danger">NO TOPICS</span>
                        {% endif %}
                    </div>
                    <div class="group-parts">
                        {% for part in group.parts %}
                        <div class="part-card">
                            <div class="card">
                                <a href="{{ url_for('problem_detail', filename=part.filename) }}">
                                    <img src="{{ url_for('serve_image', filename=part.filename) }}" class="card-img-top problem-image" alt="{{ part.display_name }}">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">Part {{ part.part }}</h5>
                                    <a href="{{ url_for('problem_detail', filename=part.filename) }}" class="btn btn-sm btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                </div>
                {% endfor %}
                {% endif %}
                
                <!-- Display standalone problems (mostly MCQs) -->
                {% if problems_by_year[year].standalone %}
                <h3>Multiple Choice Questions</h3>
                <div class="row">
                    {% for problem in problems_by_year[year].standalone %}
                    <div class="col-md-4">
                        <div class="card problem-card position-relative {% if problem.has_topics %}card-with-topics{% else %}card-no-topics{% endif %}">
                            {% if problem.has_topics %}
                            <span class="badge bg-success topic-badge">YES - {{ problem.topic_count }} topic(s)</span>
                            {% else %}
                            <span class="badge bg-danger topic-badge">NO TOPICS</span>
                            {% endif %}
                            <a href="{{ url_for('problem_detail', filename=problem.filename) }}">
                                <img src="{{ url_for('serve_image', filename=problem.filename) }}" class="card-img-top problem-image" alt="{{ problem.display_name }}">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">{{ problem.display_name }}</h5>
                                <a href="{{ url_for('problem_detail', filename=problem.filename) }}" class="btn btn-sm btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                {% endif %}
                
                {% endfor %}
            </div>
        </body>
        </html>
        ''',
        
        'problem.html': '''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Problem: {{ display_name }}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
            <style>
                .problem-image { max-width: 100%; height: auto; border: 1px solid #ddd; margin-bottom: 20px; }
                .no-topics-alert { background-color: #f8d7da; border-color: #f5c6cb; color: #721c24; }
                .group-part { border: 1px solid #ddd; margin-bottom: 10px; padding: 10px; border-radius: 5px; }
                .group-part img { max-width: 100%; height: auto; }
            </style>
        </head>
        <body>
            <div class="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ url_for('index') }}">Home</a></li>
                        <li class="breadcrumb-item active">{{ display_name }}</li>
                    </ol>
                </nav>
                
                {% for flash_message in get_flashed_messages() %}
                <div class="alert alert-info">{{ flash_message }}</div>
                {% endfor %}
                
                <h1>{{ display_name }}</h1>
                
                {% if is_frq and group_id %}
                <div class="alert alert-info">
                    <strong>Note:</strong> This is part of a Free Response Question group. Topic assignments can be applied to all parts of this FRQ.
                </div>
                {% endif %}
                
                <div class="row">
                    <div class="col-md-8">
                        <img src="{{ url_for('serve_image', filename=filename) }}" class="problem-image" alt="{{ display_name }}">
                        
                        {% if is_frq and group_parts %}
                        <h3 class="mt-4">Other Parts of This FRQ</h3>
                        <div class="row">
                            {% for part in group_parts %}
                            <div class="col-md-6 mb-3">
                                <div class="group-part">
                                    <h5>{{ part.problem_number }}</h5>
                                    <a href="{{ url_for('problem_detail', filename=part.problem_number) }}">
                                        <img src="{{ url_for('serve_image', filename=part.problem_number) }}" alt="{{ part.problem_number }}">
                                    </a>
                                    <div class="mt-2">
                                        <a href="{{ url_for('problem_detail', filename=part.problem_number) }}" class="btn btn-sm btn-primary">View This Part</a>
                                    </div>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                        {% endif %}
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-header">Problem Details</div>
                            <div class="card-body">
                                <p><strong>Source:</strong> {{ problem.source }}</p>
                                {% if problem.year %}
                                <p><strong>Year:</strong> {{ problem.year }}</p>
                                {% endif %}
                                {% if problem.difficulty %}
                                <p><strong>Difficulty:</strong> {{ problem.difficulty }}/5</p>
                                {% endif %}
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-header">Add Topic to This Problem</div>
                            <div class="card-body">
                                <form method="post" action="{{ url_for('add_problem_topic') }}">
                                    <input type="hidden" name="problem_id" value="{{ problem.problem_id }}">
                                    
                                    <div class="mb-3">
                                        <label for="topic_id" class="form-label">Select Topic</label>
                                        <select class="form-select" id="topic_id" name="topic_id" required>
                                            <option value="">-- Select a Topic --</option>
                                            {% for topic in all_topics %}
                                            <option value="{{ topic.topic_id }}">
                                                {{ topic.topic_number }} {{ topic.topic_name }} (Unit {{ topic.unit_number }})
                                            </option>
                                            {% endfor %}
                                        </select>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="relevance_score" class="form-label">Relevance Score (1-5)</label>
                                        <input type="number" class="form-control" id="relevance_score" name="relevance_score" min="1" max="5" value="5">
                                        <div class="form-text">How relevant is this topic to the problem?</div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="notes" class="form-label">Notes</label>
                                        <textarea class="form-control" id="notes" name="notes" rows="2"></textarea>
                                    </div>
                                    
                                    {% if is_frq and group_id %}
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="apply_to_group" name="apply_to_group" checked>
                                        <label class="form-check-label" for="apply_to_group">Apply to all parts of this FRQ</label>
                                    </div>
                                    {% endif %}
                                    
                                    <button type="submit" class="btn btn-primary">Add Topic</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h2 class="mt-4">Related Topics</h2>
                {% if topics %}
                <div class="list-group">
                    {% for topic in topics %}
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">
                                <a href="{{ url_for('topic_detail', topic_id=topic.topic_id) }}">
                                    {{ topic.topic_number }} {{ topic.topic_name }}
                                </a>
                            </h5>
                            <small>Relevance: {{ topic.relevance_score }}/5</small>
                        </div>
                        <p class="mb-1">Unit {{ topic.unit_number }}: {{ topic.unit_name }}</p>
                        {% if topic.notes %}
                        <small>Notes: {{ topic.notes }}</small>
                        {% endif %}
                        <form method="post" action="{{ url_for('remove_problem_topic') }}" class="mt-2">
                            <input type="hidden" name="problem_id" value="{{ problem.problem_id }}">
                            <input type="hidden" name="topic_id" value="{{ topic.topic_id }}">
                            
                            {% if is_frq and group_id %}
                            <div class="form-check mb-2">
                                <input type="checkbox" class="form-check-input" id="remove_from_group" name="remove_from_group" checked>
                                <label class="form-check-label" for="remove_from_group">Remove from all parts of this FRQ</label>
                            </div>
                            {% endif %}
                            
                            <button type="submit" class="btn btn-sm btn-danger">Remove Topic</button>
                        </form>
                    </div>
                    {% endfor %}
                </div>
                {% else %}
                <div class="alert alert-danger no-topics-alert">
                    <h4 class="alert-heading">No Topics Assigned!</h4>
                    <p>This problem doesn't have any topics associated with it yet. Please use the form on the right to add relevant topics.</p>
                </div>
                {% endif %}
                
                <div class="mt-4">
                    <a href="{{ url_for('index') }}" class="btn btn-secondary">Back to Problems</a>
                </div>
            </div>
        </body>
        </html>
        ''',
        
        'topics.html': '''
        <!DOCTYPE html>
        <html>
        <head>
            <title>AP Statistics Knowledge Tree</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
            <style>
                .unit-card { margin-bottom: 20px; }
                .topic-item { margin: 5px 0; }
            </style>
        </head>
        <body>
            <div class="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ url_for('index') }}">Home</a></li>
                        <li class="breadcrumb-item active">Knowledge Tree</li>
                    </ol>
                </nav>
                
                <h1>AP Statistics Knowledge Tree</h1>
                
                {% for flash_message in get_flashed_messages() %}
                <div class="alert alert-info">{{ flash_message }}</div>
                {% endfor %}
                
                <div class="row">
                    {% for unit_data in units_with_topics %}
                    <div class="col-md-6">
                        <div class="card unit-card">
                            <div class="card-header bg-primary text-white">
                                Unit {{ unit_data.unit.unit_number }}: {{ unit_data.unit.unit_name }}
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                    {% for topic in unit_data.topics %}
                                    <li class="list-group-item topic-item">
                                        <a href="{{ url_for('topic_detail', topic_id=topic.topic_id) }}">
                                            {{ topic.topic_number }} {{ topic.topic_name }}
                                        </a>
                                    </li>
                                    {% endfor %}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                
                <div class="mt-4">
                    <a href="{{ url_for('index') }}" class="btn btn-secondary">Back to Problems</a>
                </div>
            </div>
        </body>
        </html>
        ''',
        
        'topic.html': '''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Topic: {{ topic.topic_name }}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
            <style>
                .problem-image { max-width: 100%; height: auto; border: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <div class="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ url_for('index') }}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{ url_for('topics') }}">Knowledge Tree</a></li>
                        <li class="breadcrumb-item active">{{ topic.topic_number }} {{ topic.topic_name }}</li>
                    </ol>
                </nav>
                
                {% for flash_message in get_flashed_messages() %}
                <div class="alert alert-info">{{ flash_message }}</div>
                {% endfor %}
                
                <h1>{{ topic.topic_number }} {{ topic.topic_name }}</h1>
                <p class="text-muted">Unit {{ unit.unit_number }}: {{ unit.unit_name }}</p>
                
                <h2>Related Problems</h2>
                {% if problems %}
                <div class="row">
                    {% for problem in problems %}
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            {% if problem.problem_number.endswith('.png') %}
                            <a href="{{ url_for('problem_detail', filename=problem.problem_number) }}">
                                <img src="{{ url_for('serve_image', filename=problem.problem_number) }}" class="card-img-top problem-image" alt="{{ problem.problem_number }}">
                            </a>
                            {% endif %}
                            <div class="card-body">
                                <h5 class="card-title">{{ problem.problem_number }}</h5>
                                <p class="card-text">{{ problem.description }}</p>
                                <p class="card-text"><small class="text-muted">Relevance: {{ problem.relevance_score }}/5</small></p>
                                <a href="{{ url_for('problem_detail', filename=problem.problem_number) }}" class="btn btn-primary">View Problem</a>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                {% else %}
                <p>No problems associated with this topic yet.</p>
                {% endif %}
                
                <div class="mt-4">
                    <a href="{{ url_for('topics') }}" class="btn btn-secondary">Back to Knowledge Tree</a>
                    <a href="{{ url_for('index') }}" class="btn btn-outline-secondary">Back to Problems</a>
                </div>
            </div>
        </body>
        </html>
        ''',
        
        'search.html': '''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Search</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
            <style>
                .problem-image { max-width: 100%; height: auto; border: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <div class="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ url_for('index') }}">Home</a></li>
                        <li class="breadcrumb-item active">Search</li>
                    </ol>
                </nav>
                
                <h1>Search</h1>
                
                <form method="get" class="mb-4">
                    <div class="input-group">
                        <input type="text" class="form-control" name="query" placeholder="Search for problems or topics..." value="{{ query }}">
                        <button class="btn btn-primary" type="submit">Search</button>
                    </div>
                </form>
                
                {% if query %}
                <h2>Results for "{{ query }}"</h2>
                
                {% if problems %}
                <h3>Problems</h3>
                <div class="row">
                    {% for problem in problems %}
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            {% if problem.problem_number.endswith('.png') %}
                            <a href="{{ url_for('problem_detail', filename=problem.problem_number) }}">
                                <img src="{{ url_for('serve_image', filename=problem.problem_number) }}" class="card-img-top problem-image" alt="{{ problem.problem_number }}">
                            </a>
                            {% endif %}
                            <div class="card-body">
                                <h5 class="card-title">{{ problem.problem_number }}</h5>
                                <p class="card-text">{{ problem.description }}</p>
                                <a href="{{ url_for('problem_detail', filename=problem.problem_number) }}" class="btn btn-primary">View Problem</a>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                {% endif %}
                
                {% if topics %}
                <h3>Topics</h3>
                <div class="list-group">
                    {% for topic in topics %}
                    <a href="{{ url_for('topic_detail', topic_id=topic.topic_id) }}" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ topic.topic_number }} {{ topic.topic_name }}</h5>
                        </div>
                        <p class="mb-1">Unit {{ topic.unit_number }}: {{ topic.unit_name }}</p>
                    </a>
                    {% endfor %}
                </div>
                {% endif %}
                
                {% if not problems and not topics %}
                <div class="alert alert-info">No results found for "{{ query }}"</div>
                {% endif %}
                
                {% endif %}
                
                <div class="mt-4">
                    <a href="{{ url_for('index') }}" class="btn btn-secondary">Back to Problems</a>
                </div>
            </div>
        </body>
        </html>
        '''
    }
    
    for filename, content in template_files.items():
        filepath = os.path.join('templates', filename)
        with open(filepath, 'w') as f:
            f.write(content)
    
    app.run(debug=True) 