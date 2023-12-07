export function useCloudinary() {
   // non devo utilizzare il metodo openUploadWidget() ma createUploadWidget()
   function openWidget(): Promise<{ img: string, tmb: string }> {
      return new Promise((resolve) => {
         const uploadWidget = window.cloudinary.createUploadWidget(
            {
               cloudName: "dqnclur2i",
               uploadPreset: "ml_default",
               sources: ["local", "camera", "url"],
            }, 
            (error: any, result: any) => {
               
               if (!error && result && result.event === "success") {
                  const img = result.info.url;
                  const tmb = result.info.thumbnail_url;

                  resolve({ img, tmb });
               } 
            })
   
         uploadWidget.open();   
      })
   }

   return {
      openWidget
   }
}
