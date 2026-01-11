import { create } from 'zustand';
import { DefaultService, Assignment, NewAssignment } from '@/lib/api';

interface AssignmentState {
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
  fetchAssignments: () => Promise<void>;
  addAssignment: (assignment: NewAssignment) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  loading: false,
  error: null,
  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const assignments = await DefaultService.getAssignments();
      set({ assignments, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch assignments', loading: false });
    }
  },
  addAssignment: async (assignment) => {
    try {
      const newAssignment = await DefaultService.createAssignment(assignment);
      set((state) => ({
        assignments: [...state.assignments, newAssignment],
      }));
    } catch (error) {
      console.error('Failed to add assignment:', error);
    }
  },
}));
