import { Product } from "@/model/product";
import placeholderImage from '@/assets/images/placeholder-game.png'

interface ProductCardProps {
	product: Partial<Product>;
	onAddToCart: (product: Partial<Product>) => void;
}

export function ProductCard(props: ProductCardProps) {
	const { product, onAddToCart } = props;

	return (
		// flex card
		<div className="flex flex-col card-cart p-3 shadow">
			{/* flex con image, product name and product price */}
			<div className="flex items-start p-3 gap-5">
				{product.img ? (
					<img
						src={product.tmb}
						alt={product.name}
						className="h-32"
					/>
				) : (
               <img
                  src={placeholderImage}
                  alt='cover videogame'
                  className="h-32 shadow"
               />
            )}

				<div className="flex flex-col items-start">
					<h3 className="mb-2">{product.name}</h3>
					<p className="bg-teal-950 py-1 px-3 text-white rounded-full mb-2">
						{product.console}
					</p>
               <p className="bg-teal-800 py-1 px-2 text-white rounded-full">
						€ {product.price}
					</p>

				</div>
			</div>

			{/* container con description */}
			<div className="p-3">
				<p className="text-sm">
					<span className="font-semibold">Descrizione: </span>
					{product.description}
				</p>
			</div>

			{/* container con button */}
			<div className="mt-auto text-center">
				<button
					className="btn bg-teal-950 text-white uppercase mt-auto"
					onClick={() => onAddToCart(product)}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}
