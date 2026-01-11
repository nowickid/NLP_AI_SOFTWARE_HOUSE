# Asset Management Frontend

This project is a modern frontend application for an Asset Management system. It is built using React, Vite, TypeScript, and Tailwind CSS to provide a visually stunning, highly polished, and user-friendly experience.

## Architecture

The application follows a component-based architecture, with a clear separation of concerns between UI components, services for API interaction, and application state management.

- **Framework:** React with Vite for a fast development experience.
- **Language:** TypeScript for type safety and improved developer experience.
- **Styling:** Tailwind CSS for a utility-first approach to styling, enabling rapid development of a custom and modern UI.
- **Routing:** React Router for handling client-side routing.
- **API Communication:** An Axios-based service layer to interact with the backend REST API.

## Project Structure

```
/src
|-- /components       # Reusable UI components (e.g., Button, Input, Modal)
|-- /pages            # Top-level page components (e.g., Assets, Employees)
|-- /services         # API client for communication with the backend
|-- /utils            # Utility functions
|-- App.tsx           # Main application component with routing
|-- main.tsx          # Entry point of the application
|-- index.css         # Global styles
```

## OpenAPI Specification

The frontend consumes the API endpoints defined in the provided OpenAPI specification. The base URL for the API is `http://localhost:3000/api`.

Key API endpoints include:
- `/employees`
- `/assets`
- `/assignments`
- `/returns`
- `/maintenance`
