# Changelog

All notable changes to the AP Statistics Hub project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-06-01

### Added
- Initial release of AP Statistics Hub
- Flask web application with SQLite database
- Complete AP Statistics knowledge tree with all units and topics
- Problem organization by year and type (MCQ/FRQ)
- FRQ grouping functionality for related question parts
- Topic tagging system with relevance scores
- Metadata management for problems (year, type, number, description, difficulty)
- Search functionality for problems and topics
- Responsive UI built with Bootstrap
- Problem detail pages with topic relationships
- Topic detail pages with problem relationships
- Visual indicators for problems with/without topic assignments

### Fixed
- Issue with SQLite Row object access using `.get()` method
- Database schema to include `problem_type` and `problem_num` columns
- Metadata persistence when updating problem information
- Display of problem information on main page and detail pages

### Known Issues
- Currently only supports problems from Unit 1 (Exploring One-Variable Data)
- Image filenames should follow specific pattern for best metadata extraction 