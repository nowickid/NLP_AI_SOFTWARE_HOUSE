# Asset Management Backend

This project is a backend system for Asset Management, providing data persistence, business logic, and a RESTful API.

## Architecture

The application is built using the following technologies:

*   **Framework:** FastAPI - A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **Database:** SQLite - A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
*   **ORM:** SQLAlchemy - The Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL.
*   **Data Validation:** Pydantic - Data validation and settings management using Python type annotations.

The project follows a layered architecture:

*   `main.py`: The entry point of the application. It defines the FastAPI app and the API endpoints.
*   `database.py`: Manages the database connection and session.
*   `models.py`: Contains the SQLAlchemy models that define the database schema.
*   `schemas.py`: Contains the Pydantic models (schemas) used for data validation and serialization in the API endpoints.
*   `crud.py`: Contains the functions for Create, Read, Update, and Delete (CRUD) operations, abstracting the database logic from the API endpoints.

## Project Structure

```
.
├── .gitignore
├── main.py
├── crud.py
├── models.py
├── schemas.py
├── database.py
├── requirements.txt
└── openapi.json
```

## Setup and Execution

1.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the application:**
    ```bash
    uvicorn main:app --reload
    ```

The API documentation will be available at `http://127.0.0.1:8000/docs`.
