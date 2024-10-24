import { Separator } from "@/components/ui/separator";
import { useScrollWithOffset } from "@/hooks/useScroll";
import { Crown, SquareArrowOutUpRight, Star } from "lucide-react";
import React from "react";

export const SuggestedProposal = ({
   children,
   companyName,
   overallSuitableProposal,
}) => {
   const scrollToElement = useScrollWithOffset(130);
   return (
      <>
         <div className='flex flex-col gap-4 w-full'>
            <span className='flex flex-row tracking-wide gap-2 items-center font-semibold underline text-base'>
               <Crown size={16} className='' />
               Suggested Proposal
            </span>
            <div className='container flex flex-col gap-4 mx-auto'>
               <div className='flex group gap-3 items-center '>
                  <span className=''>
                     <Star
                        size={20}
                        className='border bg-yellow-400/70 group-hover:bg-yellow-400 rounded-full p-0.5 text-white size-6'
                     />
                  </span>
                  <span
                     className='flex flex-row gap-2 text-sm font-semibold items-center cursor-pointer hover:underline hover:text-primary capitalize'
                     onClick={() => {
                        scrollToElement(
                           `proposal${overallSuitableProposal + 1}`
                        );
                     }}
                  >
                     Proposal {overallSuitableProposal + 1} -{" "}
                     <span className='tracking-wider'>
                        {companyName(overallSuitableProposal)}
                     </span>
                     <SquareArrowOutUpRight
                        size={14}
                        className='text-primary'
                     />
                  </span>
               </div>

               {children}
            </div>
         </div>
         <Separator className='' />
      </>
   );
};
