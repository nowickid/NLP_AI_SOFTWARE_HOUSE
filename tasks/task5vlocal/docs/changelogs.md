## Sprint 1: Project Initialization and Static UI

### Changes
- Initialized a React project using Vite and TypeScript.
- Created the basic directory structure for the application.
- Defined the `Asset` type in `src/types.ts` based on the OpenAPI specification.
- Implemented a static `Asset` component to display individual asset details.
- Implemented a static `AssetList` component to display a list of mock assets.
- Integrated the `AssetList` component into the main `App.tsx`.

## Sprint 2: Dynamic Data Fetching

### Changes
- Created a dedicated API service in `src/services/api.ts` to handle communication with the backend.
- Implemented a `fetchAssets` function to retrieve asset data from the `/api/assets` endpoint.
- Refactored the `AssetList` component to use `useState` and `useEffect` hooks for asynchronous data fetching.
- Replaced static mock data with live data from the API.
- Added loading and error handling states to the `AssetList` component to improve user feedback.

## Sprint 3: UI Modernization with Material-UI

### Changes
- Integrated Material-UI (`@mui/material`) as the primary UI library.
- Refactored the `Asset` component to use MUI's `Card`, `CardContent`, `Typography`, and `Chip` components for a polished look.
- Implemented dynamic chip colors in the `Asset` component to reflect the asset's status (available, assigned, maintenance).
- Overhauled the `AssetList` component to use MUI's `Container`, `Grid`, `CircularProgress`, and `Alert` components for a responsive layout and improved user feedback.
- Wrapped the root application in `CssBaseline` for consistent styling.
- Fixed a critical build issue by correcting the location of the `services` directory.

## Sprint 4: Implement "Add Asset" Feature

### Changes
- **API Service:** Added the `addAsset` function to `src/services/api.ts` to handle `POST` requests for creating new assets.
- **New Component:** Created the `AddAssetForm.tsx` component with Material-UI `TextField` and `Button` to capture new asset data.
- **Modal Integration:** Integrated the `AddAssetForm` into `AssetList.tsx` using an MUI `Dialog` (modal).
- **Real-time UI Updates:** Implemented a callback function (`onAssetAdded`) to update the `assets` state in `AssetList.tsx` immediately after an asset is created, providing a seamless user experience without a page reload.
- **UI Enhancement:** Added an "Add New Asset" button to the `AssetList` component to trigger the modal.

## Sprint 5: Implement Employee Management

### Changes
- **Type Definition:** Added the `Employee` type to `src/types.ts`.
- **API Service:** Extended `src/services/api.ts` with `fetchEmployees` and `addEmployee` functions.
- **New Components:**
  - Created `Employee.tsx` to display individual employee details.
  - Created `EmployeeList.tsx` to fetch and render a list of employees, including loading/error states and a modal for adding new employees.
  - Created `AddEmployeeForm.tsx` for the registration modal.
- **UI Layout:** Updated `App.tsx` to display both `AssetList` and `EmployeeList` side-by-side using MUI's `Grid` layout.
- **Build Fix:** Resolved a critical build failure by externalizing the `axios` dependency in the Vite configuration, enabling a successful production build.

## Sprint 6: Implement Asset Assignment

### Changes
- **API Service:** Added the `assignAsset` function to `src/services/api.ts` to handle the `POST` request to `/assignments`.
- **New Component:** Created `AssignAssetDialog.tsx`, a reusable modal component that displays a dropdown of employees for selection.
- **Component Enhancement:** The `Asset.tsx` component now includes an "Assign" button, which is conditionally disabled based on the asset's status.
- **State Management:** The `AssetList.tsx` component was updated to manage the state of the assignment dialog and the selected asset.
- **Real-time UI Updates:** Upon successful assignment, the local asset state is updated, and the UI re-renders instantly to show the asset's new "assigned" status.

## Sprint 7: Implement Asset Lifecycle Actions

### Changes
- **API Service:** The `api.ts` service was enhanced with `returnAsset` and `flagForMaintenance` functions to interact with the respective API endpoints.
- **New Component:** A `MaintenanceDialog.tsx` was created to allow users to submit a description of an issue when flagging an asset for maintenance.
- **Component Refactoring:** The main `AssetList` component was refactored for better modularity by creating a dedicated `Asset.tsx` presentational component.
- **UI Enhancements:** The `Asset` component now features "Return" and "Flag for Maintenance" buttons. These buttons are conditionally enabled based on the asset's current status (`assigned` for return, not `maintenance` for flagging).
- **Real-time State Management:** The `AssetList` component now manages the state and logic for both returning and maintenance flagging, ensuring the UI updates in real-time to reflect status changes.
- **Project Repair:** A broken `package.json` was repaired, and all necessary dependencies were reinstalled to make the project buildable.

## Sprint 8: Implement Asset History

### Changes
- **Type Definition:** Added the `AssignmentHistory` type to `src/types.ts` as per the API specification.
- **API Service:** Implemented the `getAssetHistory` function in `src/services/api.ts` to fetch the assignment history for a given asset.
- **New Component:** Created the `AssetHistoryDialog.tsx` component to display the fetched history data, complete with loading and error states.
- **UI Enhancement:** Added a "View History" button to the `Asset.tsx` component, making the feature accessible for every asset.
- **State Management:** Updated `AssetList.tsx` to manage the state for the history dialog, including fetching the data when the button is clicked and passing it to the dialog.

This sprint completes all the features defined in the OpenAPI specification. The project is now feature-complete.

