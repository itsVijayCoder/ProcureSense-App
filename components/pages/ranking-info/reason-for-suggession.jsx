import { CheckCircle } from "lucide-react";
import React from "react";

export const ReasonForSuggestion = ({ reasonData }) => {
   return (
      <div className='flex flex-col mx-auto container ml-1 gap-2 w-full items-start'>
         <span className='flex flex-row gap-2 items-center font-semibold w-2/12'>
            Reason For Suggestion
         </span>
         <div className='flex flex-col gap-1  container mx-auto'>
            {reasonData?.map((reason, idx) => (
               <span
                  key={idx}
                  className='flex flex-row gap-2 items-start content-color'
               >
                  <CheckCircle size={20} className='text-success-text ' />
                  <span className='max-w-md'>{reason}</span>
               </span>
            ))}
         </div>
      </div>
   );
};
