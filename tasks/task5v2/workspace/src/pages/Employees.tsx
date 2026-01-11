import { useEffect } from "react";
import { useEmployeeStore } from "@/lib/store/employees";
import { columns } from "./employees/columns";
import { DataTable } from "@/components/ui/data-table";
import { CreateEmployeeDialog } from "@/components/CreateEmployeeDialog";

export default function Employees() {
  const { employees, loading, error, fetchEmployees } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <CreateEmployeeDialog />
      </div>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
