### Sprint 1: Project Setup and Core Component

- **Project Initialization**: Successfully set up a new React project using Vite and TypeScript.
- **Dependency Installation**: Installed `tailwindcss`, `postcss`, `autoprefixer` for styling, and `axios` for API communication.
- **Styling Configuration**: Configured Tailwind CSS by generating `tailwind.config.js` and `postcss.config.js` and setting up the base CSS file with Tailwind directives.
- **Core Component**: Created the `AssetList` component (`src/components/AssetList.tsx`) to display a styled table of assets using mock data.
- **Application Integration**: Updated the main `App.tsx` to render the `AssetList` component and applied basic application-wide styling.
- **Verification**: Confirmed that the Vite development server runs successfully.

### Sprint 2: Advanced Asset Management Features

- **Add Asset Form**: Created the `AddAssetForm` component (`src/components/AddAssetForm.tsx`) with input fields for asset type and serial number. The form successfully submits new assets to the API via a `POST` request.
- **Asset History Modal**: Developed the `AssetHistoryModal` component (`src/components/AssetHistoryModal.tsx`) to display the assignment history of a selected asset. It fetches data from the API, handles loading and error states, and is presented as a modal dialog.
- **Application Integration**:
    - Integrated the `AddAssetForm` into `App.tsx`.
    - Implemented a refresh mechanism (`refreshKey`) in `App.tsx` to automatically update the `AssetList` after a new asset is created.
    - Added an "Actions" column to the `AssetList` component with a "View History" button that opens the `AssetHistoryModal` for the corresponding asset.

### Sprint 3: Employee and Assignment Management

- **Employee Management**: Created the `EmployeeManagement` component (`src/components/EmployeeManagement.tsx`) with a form to register new employees. It successfully handles API `POST` requests to `/api/employees` and provides user feedback.
- **Assignment Management**: Developed the `AssignmentManagement` component (`src/components/AssignmentManagement.tsx`). This component features a form with a dropdown for selecting available assets (fetched from `/api/assets?status=available`) and an input for the employee ID to create new assignments.
- **Application Integration**:
    - Integrated the new `EmployeeManagement` and `AssignmentManagement` components into `App.tsx`.
    - Organized all management forms into a responsive grid layout for a clean user interface.
    - Connected the `AssignmentManagement` component to the global `refreshKey` state, ensuring the `AssetList` updates automatically after an asset is assigned.

### Sprint 4: Asset Status and Maintenance

- **Return Asset Form**: Created the `ReturnAssetForm` component (`src/components/ReturnAssetForm.tsx`) with a form to return an asset by providing its `assignment_id`.
- **Maintenance Form**: Developed the `MaintenanceForm` component (`src/components/MaintenanceForm.tsx`) to flag an asset for maintenance, including fields for the `asset_id` and an optional `issue_description`.
- **Application Integration**:
    - Integrated both the `ReturnAssetForm` and `MaintenanceForm` into the main `App.tsx` dashboard.
    - Connected both components to the global `refreshKey` state to ensure the `AssetList` updates automatically when an asset's status changes.

