# Asset Management Frontend

This is a modern frontend application for an Asset Management system, built with React, TypeScript, and Vite. It consumes the Asset Management API to provide a user-friendly interface for managing company assets. The UI is built using **Material-UI (MUI)** for a professional and polished look and feel.

## Features

- View lists of all assets and employees.
- Add new assets and register new employees.
- Assign an available asset to an employee.
- Return an assigned asset, making it available again.
- Flag an asset for maintenance with an issue description.
- View the complete assignment history for any asset.
- Real-time UI updates for all actions.

## Architecture

The application follows a component-based architecture.

- **`src/components`**: Contains reusable React components for managing Assets and Employees, including forms and dialogs for all major actions.
- **`src/services`**: Contains modules for interacting with the backend API.
- **`src/types.ts`**: Defines the TypeScript types used throughout the application.
- **`App.tsx`**: The main application component that orchestrates the different views.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  Build for production: `npm run build`
