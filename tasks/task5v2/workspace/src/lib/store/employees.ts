import { create } from 'zustand';
import { Employee } from '../api';
import { DefaultService } from '../../api';

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  fetchEmployees: () => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  isLoading: false,
  fetchEmployees: async () => {
    set({ isLoading: true });
    try {
      const employees = await DefaultService.getEmployees();
      set({ employees, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      set({ isLoading: false });
    }
  },
}));
