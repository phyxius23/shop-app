import { ChangeEvent, useState } from "react";

export function useLogin() {
	const [userLogin, setUserLogin] = useState({ username: "", password: "" });

	function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setUserLogin((state) => ({ ...state, [name]: value }));
	}

	const isUsernameValid = userLogin.username.length > 2;
	const isPasswordValid = userLogin.password.length > 3;
	const isValid = isUsernameValid && isPasswordValid;

	return {
		actions: {
			changeHandler,
		},
		validations: {
			isUsernameValid,
			isPasswordValid,
			isValid,
		},
		userLogin,
	};
}
