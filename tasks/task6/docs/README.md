# Asset Management Application

This project is a full-stack application designed to help organizations track and manage their device inventory and employee assignments.

## Architecture Overview

The application will be built using a modern web stack, with a clear separation between the frontend and backend.

### Backend

The backend will be a RESTful API responsible for all business logic and data persistence.

- **Database:** A relational database will be used to store information about employees, devices, and their assignments.
  - **`employees` table:** Stores employee information (`id`, `name`, `department`).
  - **`devices` table:** Stores device information (`id`, `type`, `serial_number`, `status`). The status can be 'available', 'assigned', or 'maintenance'.
  - **`assignments` table:** Tracks the history of device assignments, linking devices to employees (`id`, `device_id`, `employee_id`, `assigned_date`, `returned_date`).

- **API Endpoints:** The API will expose endpoints for all core functionalities:
  - Employee management
  - Device inventory management
  - Asset assignment and return
  - Status updates (e.g., flagging for maintenance)
  - Audit trails for devices and employees

### Frontend

The frontend will be a single-page application (SPA) designed for a highly interactive and polished user experience. It will communicate with the backend via the REST API.

- **UI/UX:** The interface will be designed to be visually stunning and intuitive, providing clear feedback for all user actions and ensuring smooth interactions.
- **Core Features:**
  - Registering new employees.
  - Adding new devices to the inventory.
  - Viewing and filtering device lists (e.g., by availability).
  - Assigning devices to employees.
  - Processing device returns.
  - Viewing asset assignments per employee.
  - Auditing the complete history of a specific device.

## Development Plan

The project will be developed in iterative sprints, focusing on delivering functional milestones.

- **Sprint 1: Core Backend Logic:** Implement the database schema and all necessary API endpoints.
- **Sprint 2: Frontend Scaffolding:** Set up the frontend project and build the basic UI layout and components.
- **Sprint 3: Core Frontend Features:** Implement the main asset management functionalities in the UI.
- **Sprint 4: Advanced Features & Polish:** Add audit trails, advanced filtering, and apply a polished visual design.
