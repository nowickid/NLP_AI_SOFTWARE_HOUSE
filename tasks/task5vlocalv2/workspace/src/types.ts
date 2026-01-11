export interface Asset {
  id: number;
  type: string;
  serial_number: string;
  status: 'available' | 'assigned' | 'maintenance';
}

export interface AssignmentHistory {
  assignment_id: number;
  employee_name: string;
  assigned_at: string;
  returned_at: string;
}