import { useEffect } from "react";
import { useAssignmentStore } from "@/lib/store/assignments";
import { useAssetStore } from "@/lib/store/assets";
import { useEmployeeStore } from "@/lib/store/employees";
import { columns } from "./assignments/columns";
import { DataTable } from "@/components/ui/data-table";
import { CreateAssignmentDialog } from "@/components/CreateAssignmentDialog";

export default function Assignments() {
  const { assignments, loading, error, fetchAssignments } = useAssignmentStore();
  const { fetchAssets } = useAssetStore();
  const { fetchEmployees } = useEmployeeStore();

  useEffect(() => {
    fetchAssignments();
    fetchAssets();
    fetchEmployees();
  }, [fetchAssignments, fetchAssets, fetchEmployees]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Assignment Management</h1>
        <CreateAssignmentDialog />
      </div>
      <DataTable columns={columns} data={assignments} />
    </div>
  );
}
