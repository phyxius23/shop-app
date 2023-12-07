import { NavLink } from "react-router-dom";

export function ThanksPage() {
	return (
		<>
			<h2 className="text-center">Thank you your order</h2>

			<div className="flex justify-center mt-12">
				<NavLink
					to="/shop"
					className="btn primary"
				>
					Back to Shop
				</NavLink>
			</div>
		</>
	);
}
