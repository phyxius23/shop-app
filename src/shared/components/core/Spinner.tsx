import { useEffect, useState } from "react";

export function Spinner() {
   const [show, setShow] = useState(false);

   // visualizzo lo spinner solo se sono passati X millesecondi
   useEffect(() => {
      const debounce = setTimeout(() => {
         setShow(true);
      }, 1000)

      return () => clearTimeout(debounce);
   }, [])

	return (
      // visualizzo lo spinner solo se show è true
      show && (
         <div className="text-center mb-5">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
         </div>
      )
	);
}
