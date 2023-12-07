/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { selectAuthError, selectAuthIsLogged, useAuth } from "@/services/auth";
import { ServerError } from "@/shared/";

export function LoginPage() {
	const navigate = useNavigate();

	const error = useAuth(selectAuthError);
	const isLogged = useAuth(selectAuthIsLogged);
	const login = useAuth((state) => state.login);

	const { actions, validations, userLogin } = useLogin();

	function doLogin(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		login(userLogin.username, userLogin.password);
	}

	useEffect(() => {
		if (isLogged) {
			navigate("/cms");
		}
	}, [isLogged]);

	return (
		<div className="page-sm">
			<h1 className="title">Login</h1>

			{error && <ServerError />}

			<form
				className="flex flex-col gap-3"
				onSubmit={doLogin}
			>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					name="username"
					value={userLogin.username}
					onChange={actions.changeHandler}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={userLogin.password}
					onChange={actions.changeHandler}
				/>

				<button
					type="submit"
					className="btn primary"
					disabled={!validations.isValid}
				>
					Esegui login
				</button>
			</form>
		</div>
	);
}
