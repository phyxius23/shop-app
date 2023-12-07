/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useProductsService } from "@/services/products";
import { ServerError, Spinner } from '@/shared/';
import { CMSProductsList } from "./components/CMSProductsList";
import { CMSProductForm } from "./components/CMSProductForm";

export function CMSProductsPage() {
   const { actions, state } = useProductsService();

   useEffect(() => {
      actions.getProducts()
   }, [])

	return (
		<>
			<h1 className="title mt-6">CMS - Products</h1>

         {state.pending && <Spinner />}
         {state.error && <ServerError message={state.error} />}

         <CMSProductForm 
            activeItem={state.activeItem}
            onClose={actions.resetActiveItem}
            onAdd={(product) => actions.addProduct(product)}
            onEdit={(product) => actions.editProduct(product)}
         />

         <CMSProductsList
            items={state.products}
            activeItem={state.activeItem}
            onEditItem={actions.setActiveItem}
            onDeleteItem={actions.deleteProduct}
         />

         <div className="flex justify-center">
            <button
               className="btn primary w-1/2 my-3"
               onClick={() => actions.setActiveItem({})}
            >
               Add new product
            </button>
         </div>
		</>
	);
}
