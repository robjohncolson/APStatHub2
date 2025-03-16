# AP Statistics Hub

A comprehensive web application for organizing, categorizing, and accessing AP Statistics exam problems based on the College Board's knowledge tree.

![AP Statistics Hub](https://via.placeholder.com/800x400?text=AP+Statistics+Hub)

## 🎯 Purpose

AP Statistics Hub bridges the gap between exam problems and curriculum topics, making it easier for teachers and students to find relevant practice materials for specific statistical concepts. The application allows users to:

- Browse AP Statistics exam problems organized by year and type
- View the complete AP Statistics knowledge tree with all units and topics
- Assign curriculum topics to exam problems with relevance scores
- Search for problems or topics using keywords

## ✨ Features

### Problem Organization
- View problems organized by year and type (Multiple Choice or Free Response)
- Automatic grouping of related Free Response Question parts
- Visual indicators for problems with assigned topics

### Knowledge Tree Integration
- Complete implementation of the AP Statistics curriculum structure
- All units and topics from the College Board's knowledge tree
- Easy navigation between related topics

### Metadata Management
- Add and edit problem metadata:
  - Year
  - Problem type (MCQ/FRQ)
  - Problem number
  - Description
  - Difficulty rating (1-5 scale)

### Topic Tagging
- Assign curriculum topics to exam problems
- Set relevance scores for topic-problem relationships
- Add notes to explain topic connections

## 🛠️ Installation

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/APStatHub.git
   cd APStatHub
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize the database and directory structure:
   ```bash
   python create_directory_structure.py
   python initialize_database.py
   ```

4. Run the application:
   ```bash
   python app.py
   ```

5. Access the web interface at `http://localhost:5000`

## 📖 Usage

### Viewing Problems
The home page displays all problems organized by year and type. Problems with assigned topics are highlighted with a green border, while those without topics have a red border.

### Problem Details
Click on any problem to view its details, including:
- The problem image
- Metadata (year, type, number, description, difficulty)
- Associated topics
- For FRQs, links to other parts of the same question

### Adding Topics
On the problem detail page, use the form to assign relevant topics:
1. Select a topic from the dropdown
2. Set a relevance score (1-5)
3. Add optional notes
4. For FRQs, choose whether to apply to all parts
5. Click "Add Topic"

### Editing Metadata
Click "Edit Metadata" on the problem detail page to update information about the problem.

### Browsing Topics
Use the "View Knowledge Tree" button to browse the curriculum structure. Click on any topic to see related problems.

## 🔄 Data Structure

The application uses a SQLite database with the following tables:
- `units`: AP Statistics curriculum units
- `topics`: Individual topics within each unit
- `problems`: Exam problems with metadata
- `problem_topics`: Many-to-many relationships between problems and topics

## 🚀 Future Enhancements

- Support for additional units beyond Unit 1
- Export functionality for creating practice sets
- User authentication and role-based access
- Statistics on topic coverage and problem difficulty
- Integration with learning management systems

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- College Board for the AP Statistics curriculum framework
- Flask team for the web framework
- Bootstrap team for the UI components 