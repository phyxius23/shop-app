import { selectAuthIsLogged, useAuth } from "@/services/auth";
import { PropsWithChildren } from "react";

interface IfLoggedProps {
	else?: React.ReactNode;
}

export function IfLogged(props: PropsWithChildren<IfLoggedProps>) {
	const isLogged = useAuth(selectAuthIsLogged);

	return <>{isLogged ? props.children : props.else}</>;
}
