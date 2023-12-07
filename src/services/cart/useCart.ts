import { create } from "zustand";
import { CartItem } from "@/model/cart-item";
import { Product } from "@/model/product";

// creo il tipo di dato che conterrà il carrello
export interface CartState {
	list: CartItem[];
	addToCart: (product: Product) => void; // aggiungo il prodotto alla lista (carrello)
	removeFromCart: (productId: string) => void; // rimuovo il prodotto dalla lista (carrello)
	increaseQty: (productId: string) => void; // aumento la quantità del prodotto
	decreaseQty: (productId: string) => void; // diminuisco la quantità del prodotto
	clearCart: () => void; // diminuisco la quantità del prodotto
}

export const useCart = create<CartState>((set, get) => ({
	list: [],
	addToCart: (product: Product) => {
		const found = get().list.find((item) => item.product.id === product.id);

		if (found) {
			// increase qty
			get().increaseQty(product.id);
		} else {
			// add product to cart
			const item: CartItem = { product, qty: 1 };
			set((state) => ({ list: [...state.list, item] }));
		}
	},
	removeFromCart: (productId: string) => {
		// qui filtro in modo che mi tornino tutti i prodotti che passano la condizione
		set((state) => ({ list: state.list.filter((item) => item.product.id !== productId) }));
	},
	increaseQty: (productId: string) => {
		// aumento il contatore della quantità di prodotti specifici per un prodotto
		const found = get().list.find((item) => item.product.id === productId);

		if (found) {
			found.qty++;

			set((state) => ({
				list: state.list.map((item) => (item.product.id === productId ? found : item)),
			}));
		}
	},
	decreaseQty: (productId: string) => {
		const found = get().list.find((item) => item.product.id === productId);

		if (found?.qty === 1) {
			get().removeFromCart(productId);
		}

		if (found && found.qty > 1) {
			found.qty--;

			set((state) => ({
				list: state.list.map((item) => (item.product.id === productId ? found : item)),
			}));
		}
	},
	clearCart: () => {
		set({ list: [] });
	},
}));
