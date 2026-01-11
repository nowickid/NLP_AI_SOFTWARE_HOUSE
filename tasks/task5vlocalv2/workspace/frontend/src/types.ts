export interface Asset {
  id: number;
  type: string;
  serial_number: string;
  status: 'available' | 'assigned' | 'maintenance';
}

export interface Employee {
  id: number;
  name: string;
  department: string;
}

export interface Assignment {
  id: number;
  asset_id: number;
  employee_id: number;
  assigned_at: string;
}