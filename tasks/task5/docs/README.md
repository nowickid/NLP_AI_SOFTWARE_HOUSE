# Asset Management Frontend

This project is a modern frontend application for an Asset Management system, built with React, Vite, and TypeScript. It consumes the API endpoints defined in the provided OpenAPI specification to manage employees, assets, and assignments.

## Project Structure

The project will be organized into the following sprints:

### Sprint 1: Project Setup and Core Component
- **Goal**: Initialize a React project using Vite and TypeScript. Create a foundational `AssetList` component that fetches and displays a list of assets from the API. This will set up the project structure and ensure API connectivity.

### Sprint 2: Advanced Asset Management Features
- **Goal**: Implement functionality to add new assets and view the assignment history of a selected asset. This will involve creating forms and handling more complex API interactions.

### Sprint 3: Employee and Assignment Management
- **Goal**: Develop components for managing employees and asset assignments. This will include registering new employees, viewing assets assigned to an employee, and creating new assignments.

### Sprint 4: Asset Status and Maintenance
- **Goal**: Implement features for returning assets and flagging them for maintenance. This will complete the core lifecycle of an asset within the system.

### Sprint 5: Final Touches and Styling
- **Goal**: Apply modern and visually appealing styling to the entire application. Ensure all interactions are smooth and provide clear user feedback.

## API Specification

The frontend application will interact with the backend according to the following OpenAPI specification:

```yaml
openapi: 3.0.3
info:
  title: Asset Management API
  description: Simple API for managing employees, assets and assignments
  version: 1.0.0

servers:
  - url: http://localhost:3000/api
    description: Local server

paths:
  /employees:
    post:
      summary: Register a new employee
      # ... (rest of the spec)
  # ... (rest of the paths)
```
