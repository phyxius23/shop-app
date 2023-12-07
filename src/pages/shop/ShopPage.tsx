/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ProductCard } from "./components/ProductCard";
import { ServerError, Spinner } from "@/shared/";
import { useCart } from "@/services/cart";
import { useProductsService } from "@/services/products";

export function ShopPage() {
	const addToCart = useCart((state) => state.addToCart);

   const { actions, state } = useProductsService()

	useEffect(() => {
      actions.getProducts();
	}, []);

	return (
		<div>
			<h1 className="title">SHOP</h1>

			{state.error && <ServerError />}
			{state.pending && <Spinner />}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
				{state.products.map((product) => {
					return (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={() => addToCart(product)}
						/>
					);
				})}
			</div>
		</div>
	);
}
