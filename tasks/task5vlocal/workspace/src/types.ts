export interface Asset {
  id: number;
  name: string;
  description: string;
  status: 'in_stock' | 'assigned' | 'in_maintenance' | 'disposed';
  assigned_to: number | null;
  maintenance_notes: string | null;
}

export interface Employee {
  id: number;
  name: string;
}

export interface AssignmentHistory {
  assignment_id: number;
  employee_name: string;
  assigned_at: string;
  returned_at: string;
}