## Sprint 1: Core Database Logic and Setup

- **Project Initialization**: Initialized a Node.js project and added `express` and `sqlite3` as dependencies.
- **Database Schema**: Created `src/database/schema.sql` with `CREATE TABLE` statements for `employees`, `assets`, and `assignments`.
- **Database Setup**: Implemented `src/database/database.js` to connect to the SQLite database (`assets.db`), read the schema, and create the tables.
- **Database Created**: Successfully generated the `assets.db` file.


## Sprint 2: Implement Data Models and API Scaffolding

- **Data Models**: Created `src/database/models.js` with functions to interact with the database tables (`employees`, `assets`, `assignments`).
- **Controllers**: Implemented `src/controllers/assetController.js` to handle business logic for API endpoints.
- **API Routes**: Defined all API endpoints in `src/routes/api.js` using an Express Router and mapped them to controller functions.
- **Application Setup**: Created the main application entry point in `src/app.js`, initializing the Express server and mounting the API routes.
- **Server Running**: The Node.js server is successfully running and listening on port 3000.


## Sprint 3: Implement Business Logic and Finalize API Endpoints

- **Database Logic**: Implemented all data access functions in `src/database/models.js` to handle database operations.
- **Business Logic**: Implemented the core business logic in `src/controllers/assetController.js`, connecting API endpoints to database models and enforcing application rules.
- **Testing**:
    - Set up a testing environment with Mocha, Chai, and Supertest.
    - Developed a comprehensive suite of integration tests covering all API endpoints and business rules.
- **Verification**: All integration tests are passing, confirming the API is fully functional as per the specification.
- **Project Complete**: The backend system for Asset Management is now complete and verified.


