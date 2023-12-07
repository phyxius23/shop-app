import { NavLink, useNavigate } from "react-router-dom";
import { selectCartIsEmpty, selectTotalCartItems, useCart } from "@/services/cart";
import { useAuth } from "@/services/auth";
import { IfLogged } from "@/shared/";

const isActive = (obj: { isActive: boolean }) =>
	obj.isActive ? "wrapper-icon active" : "wrapper-icon";

export function NavBar() {
	const navigate = useNavigate();

	const totalCartItems = useCart(selectTotalCartItems);
	const cartIsEmpty = useCart(selectCartIsEmpty);

	const logout = useAuth((state) => state.logout);

	function logoutHandler() {
		// logout
		logout();

		// redirect to login
		navigate("/login");
	}

	return (
		<header className="bg-teal-950 text-white fixed top-0 left-0 right-0">
			<nav className="flex justify-around items-center gap-3">
				{/* Shop button */}
				<NavLink
					to="shop"
               title="shop"
					className={isActive}
				>
					<i
						className="fa fa-home"
						aria-hidden="true"
					></i>
				</NavLink>

				{/* Componente che mostra i NavLink in base al valore di ifLogged (autenticazione true or false) */}
				<IfLogged
					else={
						<>
							{/* Login button - visualizzato quando isLogged is false */}
							<NavLink
								to="login"
                        title="login"
								className={isActive}
							>
								<i
									className="fa fa-sign-in"
									aria-hidden="true"
								></i>
							</NavLink>
						</>
					}
				>
					<>
						{/* CMS & Logout buttons - visualizzati quando isLogged is true */}
						<NavLink
							to="cms"
                     title="cms"
							className={isActive}
						>
							<i
								className="fa fa-sitemap"
								aria-hidden="true"
							></i>
						</NavLink>

						<button onClick={logoutHandler} title="logout">
							<i
								className="fa fa-sign-out"
								aria-hidden="true"
							></i>
						</button>
					</>
				</IfLogged>

				{/* Cart Badge - visualizzata quando il carrello ha dei prodotti */}
				{!cartIsEmpty && (
					<NavLink
						to="cart"
						className="fixed bottom-3 right-3 lg:bottom-8 lg:right-8 bg-teal-950 rounded-full p-5"
					>
						<div className="w-6 h-6 flex justify-center items-center relative">
							<i
								className="fa fa-shopping-cart"
								aria-hidden="true"
							></i>
							<span className="absolute -top-4 -right-2 font-bold">
								{totalCartItems > 0 && totalCartItems}
							</span>
						</div>
					</NavLink>
				)}
			</nav>
		</header>
	);
}
