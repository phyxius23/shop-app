import { useReducer } from "react";
import * as ProductsApi from "@/services/products/products.api"
import { productsReducer, initialState } from "@/services/products/products.reducer"
import { Product } from "@/model/product";

export function useProductsService() {
   const [state, dispatch] = useReducer(productsReducer, initialState);

   async function getProducts() {
      dispatch({ type: 'pending', payload: true });

      try {
         const res = await ProductsApi.get();
         dispatch({ type: 'productsGetSuccess', payload: res.items })
      } catch (error) {
         dispatch({ type: 'error', payload: 'Products not loaded'})
      }      
   }

   async function deleteProduct(productId: string) {
      dispatch({ type: 'pending', payload: true })

      try {
         await ProductsApi.remove(productId);
         dispatch({ type: 'productDeleteSuccess', payload: productId })
      } catch (error) {
         dispatch({ type: 'error', payload: 'Products not loaded'})
      }
   }

   async function addProduct(product: Partial<Product>) {
      dispatch({ type: 'pending', payload: true })
      
      try {
         const res = await ProductsApi.add(product);
         dispatch({ type: 'productAddSuccess', payload: res })
      } catch (error) {
         dispatch({ type: 'error', payload: 'Product not added'})
      }
   }

   async function editProduct(product: Partial<Product>) {
      dispatch({ type: 'pending', payload: true })

      try {
         const res = await ProductsApi.edit(product);
         dispatch({ type: 'productEditSuccess', payload: res })
      } catch (error) {
         dispatch({ type: 'error', payload: 'Product not updated'})
      }
   }

   function setActiveItem(product: Partial<Product> | object) {
      dispatch({ type: 'productSetActive', payload: product })
   }

   function resetActiveItem() {
      // imposto un timer perchè ho impostato una transition, e sepppur per soli pochi millesimi di secondo ma vedo i campi rossi del form, popo brutto!!!
      const debounce = setTimeout(() => {
         dispatch({ type: 'productSetActive', payload: null })
      }, 1000)

      return () => clearTimeout(debounce);
      // setTimeout(()=>{
      //    dispatch({ type: 'productSetActive', payload: null })
      // }, 300)
   }

   return {
      actions: {
         getProducts,
         deleteProduct,
         addProduct,
         editProduct,
         setActiveItem,
         resetActiveItem,
      },
      state
   }
}
