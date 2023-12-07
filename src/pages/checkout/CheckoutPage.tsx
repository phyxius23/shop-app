import clsx from "clsx";
import { useCheckout } from "./hooks/useCheckout";
import { ServerError } from "@/shared/";

export function CheckoutPage() {
	const { actions, validators, user, dirty, totalCartPrice, error } = useCheckout();

	return (
		<div className="page-sm">
			<h1 className="title">Checkout</h1>

         {error && <ServerError message={error} />}

			<div className="flex flex-col gap-4 px-6 pt-3 pb-8 border-b-2">
				<p className="h3">
					Totale del carrello: €{" "}
					<span className="h2 font-semibold">{totalCartPrice.toFixed(2)}</span>
				</p>
			</div>

			<div className="max-w-sm mx-auto p-3">
				<form
					className="flex flex-col gap-3 py-3"
					onSubmit={actions.sendOrder}
				>
					<label htmlFor="name">Il tuo nome: </label>
					<input
						type="text"
						id="name"
						name="name"
						value={user.name}
						onChange={actions.changeHandler}
						className={clsx({ error: !validators.isNameValid && dirty })}
					/>

					<label htmlFor="email">La tua email: </label>
					<input
						type="email"
						id="email"
						name="email"
						value={user.email}
						onChange={actions.changeHandler}
						className={clsx({ error: !validators.isEmailValid && dirty })}
					/>

					<button
						type="submit"
						className="btn primary"
						disabled={!validators.isValid}
					>
						Invia l'ordine
					</button>
				</form>
			</div>
		</div>
	);
}
