import clsx from "clsx";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Product } from "@/model/product"
import { useCloudinary } from "@/shared/"

export interface CMSProductFormProps {
   activeItem: Partial<Product> | null;
   onClose: () => void;
   onAdd: (product: Partial<Product>) => void;
   onEdit: (product: Partial<Product>) => void;
}

const initialState: Partial<Product> = {
   name: '',
   console: '',
   description: '',
   price: 0,
   tmb: '',
   img: '',
}

export function CMSProductForm(props: CMSProductFormProps) {
   const [formData, setFormData] = useState(initialState);
   const [dirty, setDirty] = useState(false);

   const { openWidget } = useCloudinary()

   const console = ['PS4', 'PS5', 'Xbox One'];

   useEffect(() => {
      // check: se activeItem ha un id significa che sto eseguendo una modifica
      if (props.activeItem?.id) {
         setFormData({ ...props.activeItem });
      } else {
         // check: se non ha un id sto inizializzando un nuovo oggetto
         setFormData(initialState);
      }
   }, [props.activeItem])


   function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
      // recupero la chiave assegnata all'attributo name
      const name = e.currentTarget.name;

      // contiene il valore di input o textarea o select
      const value = e.currentTarget.value;
      
      // scrivendo [name] rendo dinamico il nome della proprietà dell'oggetto da cambiare 
      setFormData(s => ({...s, [name]: value }) )
      setDirty(true);
   }

   function saveHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (props.activeItem?.id) {
         // EDIT
         props.onEdit(formData)
      } else {
         // ADD
         props.onAdd(formData);
      }
   }

   function uploadHandler() {
      openWidget()
         .then(res => {
            // update state
            setFormData(s => ({ ...s, ...res }))
         })
   }

   const isNameValid = formData.name?.length;
   //  utilizzo not null assertion operator: asserisco che price non sarà MAI ne null ne undefined
   const isPriceValid = formData.price! > 0;
   const isDescValid = formData.description?.length;
   const isValid = isNameValid && isPriceValid && isDescValid;

   return (
      <div className={clsx(
            'fixed bg-gray-400 w-full h-full left-0 z-10 transition-all duration-300 overflow-auto',
            {'-bottom-full': !props.activeItem},
            {'bottom-0': props.activeItem},
         )}>
            <form className="max-w-sm m-auto my-6" onSubmit={saveHandler}>
               {formData.img && (
                  <div className="w-full my-6">
                     <img 
                        src={formData.img} 
                        alt={formData.name} 
                        className="w-32 mx-auto"
                     />
                  </div>
               )}

               <div className="flex flex-col gap-2">
                  <label htmlFor="name">Product name:</label>
                  <input 
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={changeHandler}
                     className={clsx({ 'error': !isNameValid && dirty })}
                  />

                  <label htmlFor="console" className="mb-2">Console:</label>
                  <select 
                     name="console" 
                     id="console"
                     onChange={changeHandler}
                     className={clsx({ 'error': !isPriceValid && dirty })}
                  >
                     {props.activeItem?.id ? (
                        <>
                           <option value={props.activeItem?.console}>{props.activeItem?.console}</option>
                           {console.map((item, index) => props.activeItem?.console !== item && <option key={index} value={item}>{item}</option> )}
                        </>           
                     ) : (
                        console.map((item, index) => (
                           <option key={index} value={item}>{item}</option>
                        ))              
                     )}
                  </select>

                  <label htmlFor="price" className="mb-2">Price:</label>
                  <input 
                     type="number"
                     id="price"
                     name="price"
                     value={formData.price}
                     onChange={changeHandler}
                     className={clsx({ 'error': !isPriceValid && dirty })}
                  />

                  <label htmlFor="description" className="mb-2">Description:</label>
                  <textarea
                     rows={6} 
                     id="description"
                     name="description"
                     value={formData.description}
                     onChange={changeHandler}
                     className={clsx({'error': !isDescValid && dirty})}
                  ></textarea>

                  {/* Button: Upload Image */}
                  <button 
                     type="button"
                     className="btn outline"
                     onClick={uploadHandler}
                  >
                     Upload image
                  </button>
               </div>

               {/* Buttons: Close & Save Form */}
               <div className="flex justify-between mt-6">
                  <button 
                     type="reset"
                     className="btn secondary uppercase w-2/5"
                     onClick={props.onClose}
                  >
                     Close
                  </button>

                  <button 
                     className="btn primary uppercase w-2/5"
                     type="submit"
                     disabled={!isValid}
                  >
                     Save
                  </button>
               </div>
            </form>
      </div>
   )
}