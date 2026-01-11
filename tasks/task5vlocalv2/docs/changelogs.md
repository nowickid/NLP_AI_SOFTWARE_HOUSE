- **Sprint 1: Frontend Project Initialization and Static UI**
  - Initialized a React project using Vite and TypeScript.
  - Created static `Asset` and `AssetList` components to display sample asset data.
  - Established the basic project structure and component architecture.

- **Sprint 2: Dynamic Asset List**
  - Created an API service to communicate with the backend.
  - Refactored the `AssetList` component to fetch data dynamically from the `/assets` endpoint.
  - Implemented loading and error states for the API request.
  - Removed static mock data in favor of live data.

- **Sprint 3: Add Asset Feature**
  - Enhanced the API service with an `addAsset` function.
  - Created the `AddAssetForm` component to allow users to add new assets.
  - Integrated the form into the `AssetList` component to provide a seamless user experience.
  - The asset list now refreshes automatically when a new asset is added.

- **Sprint 4: Employee Management**
  - Added an `Employee` type definition.
  - Extended the API service with `fetchEmployees` and `addEmployee` functions.
  - Created `EmployeeList` and `AddEmployeeForm` components.
  - Updated the main application layout to display both asset and employee management sections.

- **Sprint 5: Assign Asset Feature**
  - Added an `Assignment` type definition.
  - Extended the API service with an `assignAsset` function.
  - Created the `AssignAssetForm` component with dropdowns for available assets and employees.
  - Integrated the form into the main application, ensuring the asset list updates automatically after an assignment.

- **Sprint 6: Return Asset Feature**
  - Extended the API service with `getAssignments` and `returnAsset` functions.
  - Added a "Return" button to the `Asset` component, which is conditionally displayed for assigned assets.
  - Implemented state management logic in `AssetList` to update the UI instantly when an asset is returned.

- **Sprint 7: Flag for Maintenance Feature**
  - Extended the API service with a `flagForMaintenance` function.
  - Added a "Flag for Maintenance" button to the `Asset` component, visible for assets not already in maintenance.
  - Ensured that assets flagged for maintenance are removed from the list of assignable assets.
  - Implemented and passed a comprehensive test suite for the new functionality.

- **Sprint 8: Asset Assignment History**
  - Added an `AssignmentHistory` type definition.
  - Extended the API service with a `getAssetHistory` function.
  - Created a reusable `AssetHistoryModal` component to display assignment history.
  - Integrated the modal into the `Asset` component, triggered by a "View History" button.
  - Wrote comprehensive unit tests for the modal to ensure reliability.

