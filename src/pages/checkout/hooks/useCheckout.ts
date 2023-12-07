import { OrderForm } from "@/model/order-form";
import { selectCartList, selectTotalCartPrice, useCart } from "@/services/cart";
import { useOrdersService } from "@/services/orders";
import { ClientResponseError } from "pocketbase";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// regex ottimizzata
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function useCheckout() {
	const navigate = useNavigate();
	const [user, setUser] = useState({ name: "", email: "" });
	const [dirty, setDirty] = useState(false);

	const totalCartPrice = useCart(selectTotalCartPrice);
	const clearCart = useCart((state) => state.clearCart);

   const { state, addOrder } = useOrdersService();
   const order = useCart(selectCartList);

	function changeHandler(e: ChangeEvent<HTMLInputElement>) {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setUser((state) => ({ ...state, [name]: value }));
		setDirty(true);
	}

	function sendOrder(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const orderInfo: OrderForm = {
			user,
			order,
			total_price: totalCartPrice,
			status: "pending",
		};

      addOrder(orderInfo)
      .then((res) => {
         if (!(res instanceof ClientResponseError)) {
            clearCart();
            navigate('/thanks');
         }
      })
	}

	const isNameValid = user.name.length > 2;
	const isEmailValid = user.email.match(EMAIL_REGEX);
	const isValid = isNameValid && isEmailValid;

	return {
		actions: {
			changeHandler,
			sendOrder,
		},
		validators: {
			isNameValid,
			isEmailValid,
			isValid,
		},
		user,
		dirty,
		totalCartPrice,
      error: state.error,
	};
}
