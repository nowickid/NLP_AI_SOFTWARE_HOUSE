# Modern Frontend for Asset Management System

This project is a modern, visually stunning frontend application for an Asset Management system. It is built with React, TypeScript, and Vite, and it consumes the API endpoints defined in the provided OpenAPI specification. The application provides a seamless user experience with smooth interactions and clear feedback for all actions.

## Features

The application implements the full lifecycle of asset and employee management:

*   **Asset Management:**
    *   View a list of all assets.
    *   Add a new asset.
    *   Assign an asset to an employee.
    *   Return an asset, making it available again.
    *   Flag an asset for maintenance.
    *   View the complete assignment history for any asset.

*   **Employee Management:**
    *   View a list of all employees.
    *   Register a new employee.

## Tech Stack

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** (Not specified, but designed to be visually stunning)
*   **Testing:** Vitest & React Testing Library

## How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

3.  **Run Tests:**
    ```bash
    npm test
    ```

This will start the application on a local development server, typically at `http://localhost:5173`.