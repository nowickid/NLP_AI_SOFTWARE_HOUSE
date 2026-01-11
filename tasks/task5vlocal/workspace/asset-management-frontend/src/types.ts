export type Asset = {
  id: number;
  type: string;
  serial_number: string;
  status: 'available' | 'assigned' | 'maintenance';
};
