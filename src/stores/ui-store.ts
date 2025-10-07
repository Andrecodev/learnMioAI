import { create } from 'zustand';

// UI state interface for global UI components
interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// UI store for global UI state management
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));