import { CartState } from "./useCart";

export const selectCartList = (state: CartState) => state.list;

export const selectCartIsEmpty = (state: CartState) => state.list.length === 0;

export const selectTotalCartPrice = (state: CartState) =>
	state.list.reduce((acc, item) => {
		return acc + item.product.price * item.qty;
	}, 0);

export const selectTotalCartItems = (state: CartState) =>
	state.list.reduce((acc, item) => {
		return acc + item.qty;
	}, 0);
