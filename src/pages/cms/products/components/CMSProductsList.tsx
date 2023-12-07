import clsx from "clsx";
import { Product } from "@/model/product";
import placeholderImage from '@/assets/images/placeholder-game.png'

export interface CMSProductsListProps {
   items: Product[];
   activeItem: Partial<Product> | null;
   onEditItem: (product: Partial<Product>) => void;
   onDeleteItem: (productId: string) => void
}

export function CMSProductsList(props: CMSProductsListProps) {
   const {items: products, activeItem, onEditItem, onDeleteItem} = props;

   return (
      <div className="mt-12">
         <table className="table-auto w-full hover">
            <thead>
               <tr>
                  <th className="text-left">Product</th>
                  <th className="text-left">Image</th>
                  <th>Price</th>
                  <th>Delete</th>
               </tr>
            </thead>

            <tbody>
               {products.map(product => {
                  return (
                     <tr 
                        key={product.id}
                        className={clsx(
                           'cursor-pointer',
                           {'bg-gray-200': product.id === activeItem?.id}
                        )}
                        onClick={() => {
                           onEditItem(product)
                        }}
                     >
                        <td className="w-5/12 lg:w-6/12">
                           <span className="font-semibold">
                              {product.name} - {product.console}
                           </span>
                        </td>
                        <td className="w-2/12 lg:w-1/12">
                           {/* update: aggiunto placeholder tramite ternario quando non ho una immagine */}
                           {product.img ? 
                              <img src={product.img} alt={product.name} /> : 
                              <img src={placeholderImage} alt='cover videogame' className="shadow-md" />}
                        </td>
                        <td className="w-3/12 text-center">€ {product.price}</td>
                        <td className="w-2/12 text-center">
                           <i 
                              className="fa fa-trash"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 onDeleteItem(product.id)
                              }
                              }
                           ></i>
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   )
   
}