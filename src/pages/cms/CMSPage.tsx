import { NavLink, Outlet } from "react-router-dom";

const isActive = (obj: { isActive: boolean }) =>
	obj.isActive ? "btn primary m-3 active" : "btn primary m-3";

export function CMSPage() {
	return (
		<div>
			<NavLink
				to="/cms/products"
				className={isActive}
			>
				Products
			</NavLink>
			<NavLink
				to="/cms/orders"
				className={isActive}
			>
				Orders
			</NavLink>

			<Outlet />
		</div>
	);
}
