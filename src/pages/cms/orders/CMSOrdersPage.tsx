/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useOrdersService } from "@/services/orders";
import { ServerError, Spinner } from "@/shared/";

export function CMSOrdersPage() {
   const {
      state, getOrders, deleteOrder, toggleOrderStatus
   } = useOrdersService();

   useEffect(() => {
      getOrders();
   }, []);

	return (
		<>
         <h1 className="title mt-6">CMS - Orders</h1>

         {state.pending && <Spinner />}
         {state.error && <ServerError />}

         <table className="border-collapse table-auto w-full my-12">
            <thead>
               <tr>
                  <th className="text-left">CLIENT / DATE</th>
                  <th className="text-left">ORDER INFO</th>
                  <th className="text-center">ACTIONS</th>
               </tr>
            </thead>

            <tbody>
            {
               state.orders.map(order => {
                  return (
                  <tr className="h-24" key={order.id}>
                     <td>
                        <div className="text-xl font-bold">{order.user.name}</div>
                        <div>{new Date(order.created).toDateString()}</div>
                     </td>
                     <td className="text-left">
                        <div>Total: € {order.total_price}</div>
                        <div>{order.order.length} products</div>
                     </td>
                     <td className="text-center">
                        {
                        order.status === 'pending' &&
                           <button className="btn primary" onClick={() => toggleOrderStatus(order.id, 'done')}>
                              Mark as Done
                           </button>
                        }
                        <button className="btn danger" onClick={() => deleteOrder(order.id)}>
                        <i className="fa fa-trash"></i>
                        </button>
                     </td>
                  </tr>
                  )
               })
            }
            </tbody>
         </table>
		</>
	);
}
