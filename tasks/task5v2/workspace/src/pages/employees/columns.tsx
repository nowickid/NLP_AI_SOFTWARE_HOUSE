"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/lib/api";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
];
