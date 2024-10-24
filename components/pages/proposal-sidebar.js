import { Card, CardContent } from "@/components/ui/card";
import { useScrollWithOffset } from "@/hooks/useScroll";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const ProposalSidebar = ({ proposalData }) => {
   const scrollToElement = useScrollWithOffset(130);

   return (
      <>
         <Card className='shadow-lg border-2 border-input  pr-3'>
            <ScrollArea className=' max-w-sm  lg:max-w-3xl  '>
               <CardContent className='flex   items-center p-2 py-1  md:py-2 w-full gap-2'>
                  {proposalData.map((proposal, idx) => (
                     <Button
                        variant='ghost'
                        className='cursor-pointer hover:text-primary flex items-center p-2  text-sm font-semibold '
                        key={idx}
                        onClick={(e) => {
                           e.preventDefault();
                           scrollToElement(`proposal${idx + 1}`);
                        }}
                     >
                        Proposal - {idx + 1}
                     </Button>
                  ))}
                  <ScrollBar orientation='horizontal' />
               </CardContent>
            </ScrollArea>
         </Card>
      </>
   );
};
