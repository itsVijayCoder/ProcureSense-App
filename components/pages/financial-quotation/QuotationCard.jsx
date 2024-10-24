import { SquareArrowOutUpRight } from "lucide-react";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";
import React from "react";
import { useScrollWithOffset } from "@/hooks/useScroll";

export const QuotationCard = ({
   title,
   quoteAmount,
   quoteCompany,
   companyName,
}) => {
   const quoteAmountColor = {
      Maximum: "text-red-500",
      Minimum: "text-green-500",
      Average: "text-yellow-500",
   };

   const scrollToElement = useScrollWithOffset(130);
   return (
      <>
         <Card className='shadow-md'>
            <CardHeader className='py-3 pt-4'>
               <CardTitle>{title} Quotation</CardTitle>
            </CardHeader>
            <CardContent>
               <p className={`text-2xl font-bold ${quoteAmountColor[title]}`}>
                  {quoteAmount}
               </p>
               {title !== "Average" && (
                  <div className='mt-2 flex items-center text-sm'>
                     <span
                        className='flex cursor-pointer items-center gap-1 text-primary/80 tracking-wide font-medium hover:underline hover:text-primary'
                        onClick={() =>
                           scrollToElement(`proposal${quoteCompany + 1}`)
                        }
                     >
                        {companyName(quoteCompany)}
                        <SquareArrowOutUpRight
                           size={14}
                           className='text-primary'
                        />
                     </span>
                  </div>
               )}
            </CardContent>
         </Card>
      </>
   );
};
