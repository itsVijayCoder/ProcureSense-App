import React from "react";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";
import { AlignEndHorizontal, SquareArrowOutUpRight } from "lucide-react";
import { useScrollWithOffset } from "@/hooks/useScroll";

export const RankingSection = ({ rankingData, companyName, analyse }) => {
   const scrollToElement = useScrollWithOffset(130);
   return (
      <div className='flex flex-col gap-3 items-start w-full'>
         <span className='flex flex-row gap-2 items-center font-semibold underline text-base'>
            <AlignEndHorizontal size={16} className='text-warning-text' />
            Ranking
         </span>
         <div className='container mx-auto'>
            <span className='flex flex-wrap  container mx-auto gap-4  capitalize'>
               {rankingData?.map((proposal, idx) => (
                  <Card key={idx} className='flex flex-col gap-2'>
                     <CardHeader
                        className='group flex flex-row font-semibold  gap-2 px-4 py-2 items-center cursor-pointer hover:underline  capitalize'
                        onClick={() => {
                           scrollToElement(`proposal${proposal + 1}`);
                        }}
                     >
                        <span className='border text-sm font-semibold rounded-full bg-primary/80 size-7 flex items-center justify-center text-white group-hover:bg-primary'>
                           {idx + 1}
                        </span>

                        <CardTitle className='group-hover:text-primary tracking-wider inline-flex gap-2 items-center'>
                           {/* {idx + 1} -{" "} */}
                           {companyName(proposal)}
                           <SquareArrowOutUpRight
                              size={14}
                              className='text-primary'
                           />
                        </CardTitle>
                     </CardHeader>
                     <CardContent className='max-w-xs  '>
                        <span className='font-medium text-base '>Reason: </span>
                        <span className='content-color line-clamp-3'>
                           {analyse[proposal].reasonForRank.join(", ")}
                        </span>
                     </CardContent>
                  </Card>
               ))}
            </span>
         </div>
      </div>
   );
};
