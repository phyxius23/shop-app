import { useNavigate } from "react-router-dom";
import {
	selectCartIsEmpty,
	selectCartList,
	selectTotalCartItems,
	selectTotalCartPrice,
	useCart,
} from "@/services/cart";

export function CartPage() {
	const list = useCart(selectCartList);
	const totalPrice = useCart(selectTotalCartPrice);
	const totalCartItems = useCart(selectTotalCartItems);
	const isEmpty = useCart(selectCartIsEmpty);

	const removeItem = useCart((state) => state.removeFromCart);
	const increaseQty = useCart((state) => state.increaseQty);
	const decreaseQty = useCart((state) => state.decreaseQty);

	const navigate = useNavigate();

	return (
		<>
         <div className="sticky top-12 border bg-white">
            <h1 className="title">Cart</h1>

            <div className="flex flex-col gap-4 px-6 pt-3 pb-8 border-b-2">
               {totalPrice ? (
                  <p className="h3">
                     Totale provvisorio: €{" "}
                     <span className="h2 font-semibold">{totalPrice.toFixed(2)}</span>
                  </p>
               ) : (
                  <p className="h3">Il tuo carrello è vuoto</p>
               )}

               {!isEmpty && (
                  <button
                     className="btn primary"
                     onClick={() => navigate("/checkout")}
                  >
                     Procedi all'ordine (
                     {totalCartItems > 1 ? `${totalCartItems} articoli` : `${totalCartItems} articolo`}
                     )
                  </button>
               )}
            </div>
         </div>

			<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3">
				{list.map((item) => {
					const { product, qty } = item;

					return (
						// flex card
						<div
							key={product.id}
							className="flex card-cart flex-col p-3 shadow"
						>
							{/* flex con img e un altro div (flex) */}
							<div className="flex p-3 gap-5">
								{product.img && (
									<img
										src={product.tmb}
										alt={product.name}
										className="h-32"
									/>
								)}

								{/* flex con product name, product price e un altro div (flex) */}
								<div className="flex flex-col gap-1">
									<h3>{product.name}</h3>

									<p className="">
										€ {product.price}
										<span className="text-xs"> / al pezzo</span>
									</p>

									{/* flex con buttons per la gestione dei prodotti */}
									<div className="flex text-sm font-semibold gap-3 mt-4">
										{/* flex con buttons che gestiscono la q.tà di prodotti che posso aggiungere o togliere per ogni tipo di prodotto */}
										<div className="flex rounded-md overflow-hidden shadow-md">
											<button
												className="px-2 py-1 bg-gray-300"
												onClick={() => decreaseQty(product.id)}
											>
												-
											</button>

											<div className="px-2 py-1 font-medium">{qty}</div>
											<button
												className="px-2 py-1 bg-gray-300"
												onClick={() => increaseQty(product.id)}
											>
												+
											</button>
										</div>

										{/* button che elimina un specifico prodotto */}
										<button
											className="px-2 py-1 rounded-md shadow-md"
											onClick={() => removeItem(product.id)}
										>
											Rimuovi
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
