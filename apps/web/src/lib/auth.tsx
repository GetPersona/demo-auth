import { create } from "zustand";
import type { StateCreator } from "zustand";

interface User {
	email: string;
	name: string;
}

interface AuthState {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	user: null,
	login: (user: User) => set({ user }),
	logout: () => set({ user: null }),
}));

export const fakeUser: User = {
	email: "test@demo.com",
	name: "Test Auth",
};

export default useAuthStore;
