## Sprint 1: Backend Development

- **Project Scaffolding**: Initialized a Node.js project within the `backend` directory and installed all necessary dependencies (`express`, `sqlite3`, `body-parser`).
- **Database Setup**: Created a script to initialize the SQLite database with `employees`, `devices`, and `assignments` tables.
- **API Implementation**: Developed controllers and routes for all required API endpoints.
- **Integration Testing**: Wrote a comprehensive test suite using Jest and Supertest, covering all API functionalities. All tests passed successfully.
- **Outcome**: A fully functional and tested backend API, ready for frontend integration.

## Sprint 2: Frontend Development

- **Project Setup**: Bootstrapped the project using Vite with React and TypeScript. Installed and configured `axios`, `react-router-dom`, `tailwindcss`, and `daisyui`.
- **Core UI & Routing**: Established the main application structure with a `Header` and separate pages for `Home`, `Employees`, and `Devices`, implementing seamless navigation.
- **Feature Implementation**:
  - Created forms for adding new employees and devices.
  - Built a dedicated interface for assigning available devices to employees.
  - Developed detailed views to show devices assigned to an employee and the full assignment history for a device.
  - Implemented functionality to process device returns and flag devices for maintenance.
- **UX/UI Polish**: Integrated `react-hot-toast` for user feedback and added loading state indicators for all asynchronous operations to improve user experience.
- **Outcome**: A complete and fully functional frontend that successfully connects to the backend API. The application is user-friendly, visually appealing, and feature-complete.

