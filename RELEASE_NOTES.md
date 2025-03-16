# AP Statistics Hub - Release Notes

## Version 1.0.0 (Initial Release)

**Release Date:** June 2024

### Overview

AP Statistics Hub is a comprehensive web application designed to help AP Statistics teachers and students organize, categorize, and access AP exam problems based on the College Board's knowledge tree. This tool bridges the gap between exam problems and curriculum topics, making it easier to find relevant practice materials for specific statistical concepts.

### Key Features

- **Problem Organization**: View AP Statistics exam problems organized by year and type (Multiple Choice or Free Response)
- **Knowledge Tree Integration**: Full implementation of the AP Statistics knowledge tree with all units and topics
- **Topic Tagging**: Assign curriculum topics to exam problems with relevance scores
- **FRQ Grouping**: Automatically groups related Free Response Question parts together
- **Metadata Management**: Add and edit problem metadata including:
  - Year
  - Problem type (MCQ/FRQ)
  - Problem number
  - Description
  - Difficulty rating
- **Search Functionality**: Search for problems or topics using keywords
- **Responsive UI**: Modern, mobile-friendly interface built with Bootstrap

### Technical Details

- **Backend**: Python Flask web application
- **Database**: SQLite for lightweight, portable data storage
- **Directory Structure**: Organized file system for AP Statistics course materials
- **Image Support**: Display of problem images with metadata
- **Relationship Management**: Many-to-many relationships between problems and topics

### Installation Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/APStatHub.git
   cd APStatHub
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Initialize the database and directory structure:
   ```
   python create_directory_structure.py
   python initialize_database.py
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Access the web interface at `http://localhost:5000`

### Usage Guide

1. **Viewing Problems**: The home page displays all problems organized by year and type
2. **Problem Details**: Click on any problem to view its details and associated topics
3. **Adding Topics**: On the problem detail page, use the form to assign relevant topics
4. **Editing Metadata**: Click "Edit Metadata" on the problem detail page to update information
5. **Browsing Topics**: Use the "View Knowledge Tree" button to browse the curriculum structure
6. **Searching**: Use the search function to find specific problems or topics

### Known Issues

- The application currently only supports problems from Unit 1 (Exploring One-Variable Data)
- Image filenames should follow the pattern `YYYY_AP_TYPE_##.png` for best automatic metadata extraction

### Future Enhancements

- Support for additional units beyond Unit 1
- Export functionality for creating practice sets
- User authentication and role-based access
- Statistics on topic coverage and problem difficulty
- Integration with learning management systems

### Contributors

- [Your Name] - Initial development and concept

### License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Thank you for using AP Statistics Hub! We welcome feedback and contributions to improve this tool for the AP Statistics community. 