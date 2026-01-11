"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Assignment } from "@/lib/api";
import { useAssetStore } from "@/lib/store/assets";
import { useEmployeeStore } from "@/lib/store/employees";

export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: "id",
    header: "Assignment ID",
  },
  {
    accessorKey: "asset_id",
    header: "Asset Name",
    cell: ({ row }) => {
      const assetId = row.original.asset_id;
      const { assets } = useAssetStore.getState();
      const asset = assets.find((asset) => asset.id === assetId);
      return asset ? asset.name : "Unknown Asset";
    },
  },
  {
    accessorKey: "employee_id",
    header: "Employee Name",
    cell: ({ row }) => {
      const employeeId = row.original.employee_id;
      const { employees } = useEmployeeStore.getState();
      const employee = employees.find((employee) => employee.id === employeeId);
      return employee ? employee.name : "Unknown Employee";
    },
  },
  {
    accessorKey: "assignment_date",
    header: "Assigned Date",
    cell: ({ row }) => {
      const date = new Date(row.original.assignment_date);
      return date.toLocaleDateString();
    },
  },
];
