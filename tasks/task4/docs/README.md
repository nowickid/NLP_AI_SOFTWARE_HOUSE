# Asset Management Backend

This project is a backend system for managing company assets, including employees, assets, and their assignments.

## Architecture

The system is built with Node.js and uses a light SQL-based database (SQLite) for data persistence. The API is defined by an OpenAPI specification.

The project structure will be as follows:

- `src/`
  - `database/`
    - `schema.sql`: SQL schema definition.
    - `database.js`: Database connection and setup.
    - `models.js`: Data access models.
  - `services/`: Business logic.
  - `controllers/`: API route handlers.
  - `routes/`: API route definitions.
  - `app.js`: Main application entry point.
- `openapi.yaml`: The API specification.
- `package.json`
