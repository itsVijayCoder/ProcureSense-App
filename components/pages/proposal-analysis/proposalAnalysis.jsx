import { Check, CheckCircle } from "lucide-react";
import React from "react";

export const ProposalAnalysis = ({ proposalAnalysisData, title }) => {
   return (
      <>
         {proposalAnalysisData.map((proposal, idx) => {
            const analysis =
               title === "Financial"
                  ? proposal?.financialAnalysis
                  : title === "Risk" && proposal?.riskAssessment;
            return (
               <fieldset
                  key={idx}
                  id={`proposal${idx + 1}`}
                  className='fieldset'
               >
                  <legend className='legend'>
                     Proposal - {idx + 1} Information
                  </legend>
                  <div className='flex flex-col gap-3 text-sm'>
                     <div className='grid grid-cols-6 w-full'>
                        <span className='content-heading '>Company Name</span>
                        <span className='col-span-5 content-color'>
                           {proposal.name ? proposal.name : "None"}
                        </span>
                     </div>
                     <div className='grid grid-cols-6 w-full'>
                        <span className='content-heading '>
                           {title} Analyse
                        </span>
                        <span className='col-span-5 content-color space-y-1'>
                           {analysis.length > 0
                              ? analysis.map((analyse, idx) => (
                                   <div
                                      key={idx}
                                      className='flex  gap-2 items-start'
                                   >
                                      <span className=''>
                                         <CheckCircle
                                            size={16}
                                            className=' size-4'
                                         />
                                      </span>
                                      <span className=''>{analyse}</span>
                                   </div>
                                ))
                              : "None"}
                        </span>
                     </div>
                  </div>
               </fieldset>
            );
         })}
      </>
   );
};
