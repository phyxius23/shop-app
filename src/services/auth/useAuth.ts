import { create } from "zustand";
import * as AuthService from "@/services/auth/auth.api";

export interface AuthState {
	token: string | null;
	isLogged: boolean;
	error: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
	token: AuthService.getToken(),
	isLogged: AuthService.isLogged(),
	error: false,
	login: async (username, password) => {
		set({ isLogged: false, error: false });
		try {
			await AuthService.login(username, password);
			set({ isLogged: AuthService.isLogged(), token: AuthService.getToken() });
		} catch (error) {
			set({ error: true, isLogged: false });
		}
	},
	logout: () => {
		AuthService.logout();
		set({ isLogged: false, token: null });
	},
}));
