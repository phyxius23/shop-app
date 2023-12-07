import { CartItem } from "./cart-item";

export type OrderStatus = "pending" | "done";

export interface OrderUser {
	name: string;
	email: string;
}

export interface OrderForm {
	user: OrderUser;
	order: CartItem[];
	total_price: number;
	status: OrderStatus;
}
