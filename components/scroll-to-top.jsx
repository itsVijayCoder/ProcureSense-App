import { ArrowUp } from "lucide-react";
import React from "react";

export const ScrollToTop = () => {
   return (
      <>
         <div
            className='fixed size-10 rounded-full z-20 bg-primary/80 hover:bg-primary flex justify-center items-center right-4 bottom-5 cursor-pointer'
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
         >
            <ArrowUp size={24} className='text-white font-semibold   ' />
         </div>
      </>
   );
};
