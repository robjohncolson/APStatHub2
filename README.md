# AP Statistics Knowledge Tree Database

This project creates a database and web interface for managing AP Statistics problems and their relationships to topics in the AP Statistics curriculum.

## Features

- Directory structure that mirrors the AP Statistics knowledge tree
- SQLite database to store problems, topics, and their relationships
- Web interface for browsing, searching, and managing the database
- Support for many-to-many relationships between problems and topics
- Relevance scoring to indicate how strongly a problem relates to a topic

## Setup

1. First, create the directory structure:

```bash
python create_structured_tree.py
```

2. Initialize the database with the knowledge tree:

```bash
python ap_stats_db.py
```

3. Install the required dependencies:

```bash
pip install -r requirements.txt
```

4. Run the web application:

```bash
python app.py
```

5. Open your browser and navigate to http://127.0.0.1:5000/

## Usage

### Directory Structure

The `create_structured_tree.py` script creates a directory structure based on the AP Statistics curriculum, with folders for each unit and topic.

### Database

The `ap_stats_db.py` script creates a SQLite database (`ap_stats.db`) with tables for:
- Units
- Topics
- Problems
- Problem-Topic relationships

It also imports the knowledge tree structure and can import problem assignments from markdown files.

### Web Interface

The web interface allows you to:
- Browse the knowledge tree
- View topics and their related problems
- View problems and their related topics
- Add new problems
- Link problems to topics
- Search for problems and topics

## Future Enhancements

- Integration with Supabase for cloud storage
- File upload for problem statements and solutions
- User authentication and role-based access
- Analytics to identify gaps in problem coverage
- Visualization of the knowledge tree and problem relationships 