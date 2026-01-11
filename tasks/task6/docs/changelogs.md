## Sprint 1: Core Backend Logic

- **Status:** COMPLETED
- **Summary:** Successfully implemented the entire backend for the Asset Management application.
- **Key Features:**
    - Set up a Flask application with a SQLite database.
    - Defined the database schema using SQLAlchemy for `Employee`, `Device`, and `Assignment` models.
    - Created all necessary RESTful API endpoints for:
        - Managing employees and devices.
        - Assigning, returning, and flagging devices for maintenance.
        - Retrieving current assignments for employees.
        - Viewing the complete assignment history for any device.
    - Implemented business logic to prevent assignment of unavailable devices.

