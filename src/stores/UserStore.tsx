import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Import persist middleware and createJSONStorage
import { User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true, // Initial loading state

      login: (userData: User) => {
        set({ user: userData, isAuthenticated: true, loading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, loading: false });
      },

      setLoading: (isLoading: boolean) => {
        set({ loading: isLoading });
      },
    }),
    {
      name: "user-storage", // Unique name for the persisted state
      storage: createJSONStorage(() => localStorage), // Use localStorage with JSON serialization
    },
  ),
);

export default useUserStore;
