
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useAssetStore } from "@/lib/store/assets";
import { Asset } from "@/lib/api";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { CreateAssetDialog } from "@/components/CreateAssetDialog";

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

function AssetsPage() {
  const { assets, loading, error, fetchAssets } = useAssetStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Create Asset</Button>
      </div>
      <DataTable columns={columns} data={assets} />
      <CreateAssetDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}

export default AssetsPage;
