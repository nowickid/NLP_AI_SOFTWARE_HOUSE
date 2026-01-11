### Sprint 1: Project Setup and Core UI Components

- **Project Initialization**: Successfully created a new `asset-management-frontend` project using Vite with the React and TypeScript template.
- **Styling Setup**: Installed and configured Tailwind CSS, including `postcss.config.js` and `tailwind.config.js`.
- **Component Library Integration**: Initialized the `shadcn/ui` library, configured path aliases, and set up the base theme.
- **Layout and Page Creation**: Built a main application layout and a placeholder `Dashboard` page using `shadcn/ui` components to ensure proper integration.
- **Application Entry Point**: Updated the main `App.tsx` to render the `Dashboard` page within the new layout.

### Sprint 2: API Client and State Management

- **API Client Generation**: Generated a type-safe API client from an `openapi.yaml` file using `openapi-typescript-codegen`.
- **Zustand Setup**: Installed and configured `zustand` for global state management.
- **Store Creation**: Created three separate stores for managing state: `useEmployeeStore`, `useAssetStore`, and `useAssignmentStore`.
- **API Integration**: Updated the OpenAPI specification with missing GET endpoints, regenerated the client, and integrated the API calls directly into the Zustand stores, replacing placeholder logic. The stores now handle data fetching, loading, and error states.

### Sprint 3: Asset Management Features

- **Reusable DataTable**: Created a generic `DataTable` component at `src/components/ui/data-table.tsx` using `tanstack-react-table` for displaying data.
- **Asset Management Page**: Implemented the `Assets` page (`src/pages/Assets.tsx`) to display a list of assets, handling loading and error states.
- **Create Asset Dialog**: Built a `CreateAssetDialog` with a `react-hook-form` and `zod` for validation to add new assets via the `useAssetStore`.
- **Routing & Navigation**: Added the `/assets` route and a navigation link in the main layout.
- **Integration Testing**: Set up Vitest and React Testing Library, and wrote comprehensive integration tests for the `AssetsPage`, covering data fetching and the asset creation flow.

