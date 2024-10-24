"use client";

import { useRouter } from "next/navigation";
import {
   Crown,
   SquareArrowOutUpRight,
   Check,
   Star,
   Badge,
   AlignEndHorizontal,
   CircleCheck,
   ArrowRightCircle,
   Dot,
   DotSquareIcon,
   CheckCircle,
} from "lucide-react";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { handleDateFormat } from "@/utils/function";
import { dashboardStore } from "@/stores/dashboard.js";
import { ProposalSidebar } from "@/components/pages/proposal-sidebar.js";
import { RankingSection } from "@/components/pages/ranking-info/ranking-data";
import { ReasonForSuggestion } from "@/components/pages/ranking-info/reason-for-suggession";
import { SuggestedProposal } from "@/components/pages/ranking-info/suggested-proposal";
import { DotFilledIcon } from "@radix-ui/react-icons";

const GeneralPage = () => {
   const { selectedGeneralAnalyseData } = dashboardStore();
   const router = useRouter();

   const analyse = selectedGeneralAnalyseData.analyse;
   const requestForProposal = selectedGeneralAnalyseData.requestForProposal;
   const proposals = selectedGeneralAnalyseData.proposal;
   const ranking = selectedGeneralAnalyseData.ranking;
   const reasonForOverallSelection =
      selectedGeneralAnalyseData.reasonForOverallSelection;
   const overallSuitableProposal =
      selectedGeneralAnalyseData.overallSuitableProposal;
   const proposalAnalyse = selectedGeneralAnalyseData.proposalAnalyse;

   const handleSectionScroll = (sectionId) => {
      router.push(`/analysis/#${sectionId}`);
   };

   const fetchProposalCompanyName = (idx) => {
      return proposals[idx].companyName;
   };

   return (
      <>
         <div className='grid grid-cols-[auto,1fr] gap-4 '>
            <div className='w-full col-span-full '>
               <Card>
                  <CardHeader>
                     <CardTitle>General</CardTitle>
                     <CardDescription>
                        Explore comprehensive analysis details to make informed
                        decisions.
                     </CardDescription>
                  </CardHeader>
                  {selectedGeneralAnalyseData && (
                     <CardContent>
                        <div className='flex flex-col gap-2'>
                           <form className='grid w-full items-start gap-6 overflow-auto pt-0'>
                              <fieldset className='fieldset'>
                                 <legend className='legend'>
                                    Ranking Information
                                 </legend>

                                 <div className='flex flex-col gap-5 text-sm'>
                                    <SuggestedProposal
                                       companyName={fetchProposalCompanyName}
                                       overallSuitableProposal={
                                          overallSuitableProposal
                                       }
                                    >
                                       <ReasonForSuggestion
                                          reasonData={reasonForOverallSelection}
                                       />
                                    </SuggestedProposal>

                                    <RankingSection
                                       rankingData={ranking}
                                       companyName={fetchProposalCompanyName}
                                       analyse={proposalAnalyse}
                                    />
                                 </div>
                              </fieldset>

                              <fieldset className='fieldset'>
                                 <legend className='legend'>
                                    Request For Proposal Information
                                 </legend>
                                 <div className='flex flex-col gap-3 text-sm'>
                                    <div className='grid grid-cols-6 w-full'>
                                       <span className='content-heading '>
                                          Company Name
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {requestForProposal.companyName
                                             ? requestForProposal.companyName
                                             : "None"}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Company Address
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {requestForProposal.companyAddress
                                             ? requestForProposal.companyAddress
                                             : "None"}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Release Date
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {requestForProposal.releaseDate
                                             ? requestForProposal.releaseDate
                                             : "None"}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Scope Of Work
                                       </span>
                                       <div className=' border rounded-sm content-color col-span-5'>
                                          {/* <span className='flex flex-row border-b border-t'>
                                             <span className='font-semibold w-1/6 text-center border-r border-l'>
                                                Quantity
                                             </span>
                                             <span className='font-semibold w-5/6 text-center border-r'>
                                                Description
                                             </span>
                                          </span>
                                          {requestForProposal.scopeOfWork.map(
                                             (scope, idx) => (
                                                <span
                                                   key={idx}
                                                   className='flex flex-row w-full border-b'
                                                >
                                                   <span className='flex flex-row w-1/6 justify-center border-l border-r'>
                                                      {scope.quantity}
                                                   </span>
                                                   <span className='flex flex-row w-5/6 justify-center border-r'>
                                                      {scope.description}
                                                   </span>
                                                </span>
                                             )
                                          )} */}

                                          <Table>
                                             <TableHeader>
                                                <TableRow>
                                                   <TableHead className='w-1/6'>
                                                      Quantity
                                                   </TableHead>
                                                   <TableHead className='w-5/6'>
                                                      Description
                                                   </TableHead>
                                                </TableRow>
                                             </TableHeader>
                                             <TableBody>
                                                {requestForProposal.scopeOfWork?.map(
                                                   (scope, idx) => (
                                                      <TableRow key={idx}>
                                                         <TableCell>
                                                            {scope.quantity}
                                                         </TableCell>
                                                         <TableCell>
                                                            {scope.description}
                                                         </TableCell>
                                                      </TableRow>
                                                   )
                                                )}
                                             </TableBody>
                                          </Table>
                                       </div>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Terms & Conditions
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {requestForProposal.termsConditions
                                             .length > 0
                                             ? requestForProposal.termsConditions.map(
                                                  (terms, idx) => (
                                                     <span
                                                        key={idx}
                                                        className='flex flex-row gap-2 items-center'
                                                     >
                                                        <CheckCircle
                                                           size={16}
                                                           className='text-success-text'
                                                        />
                                                        {terms}
                                                     </span>
                                                  )
                                               )
                                             : "None"}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Delivery Terms
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {requestForProposal.deliveryTerms
                                             .length > 0
                                             ? requestForProposal.deliveryTerms.map(
                                                  (terms, idx) => (
                                                     <span
                                                        key={idx}
                                                        className='flex flex-row gap-2 items-center'
                                                     >
                                                        <CheckCircle
                                                           size={16}
                                                           className='text-success-text'
                                                        />
                                                        {terms}
                                                     </span>
                                                  )
                                               )
                                             : "None"}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Payment Terms
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {requestForProposal.paymentTerms
                                             .length > 0
                                             ? requestForProposal.paymentTerms.map(
                                                  (terms, idx) => (
                                                     <span
                                                        key={idx}
                                                        className='flex flex-row gap-2 items-center'
                                                     >
                                                        <CheckCircle
                                                           size={16}
                                                           className='text-success-text'
                                                        />
                                                        {terms}
                                                     </span>
                                                  )
                                               )
                                             : "None"}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Contact Information
                                       </span>
                                       {requestForProposal.contactInformation ? (
                                          <span className='flex flex-col gap-2  content-color col-span-5 '>
                                             <span>
                                                Raised by:{" "}
                                                {
                                                   requestForProposal
                                                      .contactInformation
                                                      .raisedBy
                                                }
                                             </span>
                                             <span>
                                                Contact:{" "}
                                                {
                                                   requestForProposal
                                                      .contactInformation
                                                      .contactDetail
                                                }
                                             </span>
                                          </span>
                                       ) : (
                                          "None"
                                       )}
                                    </div>
                                 </div>
                              </fieldset>

                              <fieldset className='fieldset'>
                                 <legend className='legend'>
                                    Analyse Information
                                 </legend>
                                 <div className='flex flex-col gap-3 text-sm'>
                                    <div className='grid grid-cols-6 w-full'>
                                       <span className='content-heading '>
                                          Name
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {analyse.name}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Description
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {analyse.description}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Created At
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {handleDateFormat(analyse.createdAt)}
                                       </span>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                       <span className='content-heading '>
                                          Last Updated At
                                       </span>
                                       <span className=' content-color col-span-5'>
                                          {handleDateFormat(analyse.updatedAt)}
                                       </span>
                                    </div>
                                 </div>
                              </fieldset>

                              {proposals.map((proposal, idx) => (
                                 <fieldset
                                    key={idx}
                                    id={`proposal${idx + 1}`}
                                    className='fieldset '
                                 >
                                    <legend className='legend'>
                                       Proposal - {idx + 1} Information
                                    </legend>
                                    <div className='flex flex-col gap-3 text-sm '>
                                       <div className='grid grid-cols-6 w-full'>
                                          <span className='content-heading '>
                                             Company Name
                                          </span>
                                          <span className=' content-color col-span-5'>
                                             {proposal.companyName
                                                ? proposal.companyName
                                                : "None"}
                                          </span>
                                       </div>

                                       <div className='grid grid-cols-6 w-full'>
                                          <span className='content-heading '>
                                             Company Address
                                          </span>
                                          <span className=' content-color col-span-5'>
                                             {proposal.companyAddress
                                                ? proposal.companyAddress
                                                : "None"}
                                          </span>
                                       </div>

                                       <div className='grid grid-cols-6 w-full'>
                                          <span className='content-heading '>
                                             Company Email
                                          </span>
                                          <span className=' content-color col-span-5'>
                                             {proposal.companyEmail
                                                ? proposal.companyEmail
                                                : "None"}
                                          </span>
                                       </div>

                                       <div className='grid grid-cols-6 w-full'>
                                          <span className='content-heading '>
                                             Company Website
                                          </span>
                                          <span className=' content-color col-span-5'>
                                             {proposal.companyWebsite
                                                ? proposal.companyWebsite
                                                : "None"}
                                          </span>
                                       </div>

                                       <div className='grid grid-cols-6 w-full'>
                                          <span className='content-heading '>
                                             Submission Date
                                          </span>
                                          <span className=' content-color col-span-5'>
                                             {proposal.submissionDate
                                                ? proposal.submissionDate
                                                : "None"}
                                          </span>
                                       </div>

                                       <div className='grid gap-4 divide-y-2'>
                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Scope Of Work
                                             </span>
                                             <div className=' border rounded-sm content-color  col-span-5'>
                                                {/* <span className='flex flex-row border-b border-t'>
                                                   <span className='font-semibold w-1/12 text-center border-r border-l'>
                                                      Quantity
                                                   </span>
                                                   <span className='font-semibold w-6/12 text-center border-r'>
                                                      Description
                                                   </span>
                                                   <span className='content-heading w-2/12 text-center border-r'>
                                                      Unit Price
                                                   </span>
                                                   <span className='content-heading w-2/12 text-center border-r'>
                                                      Before Taxes
                                                   </span>
                                                   <span className='content-heading w-2/12 text-center border-r'>
                                                      Taxes
                                                   </span>
                                                   <span className='content-heading w-2/12 text-center border-r'>
                                                      Total Price
                                                   </span>
                                                </span>
                                                {proposal.scopeOfWork.map(
                                                   (scope, idx) => (
                                                      <span
                                                         key={idx}
                                                         className='flex flex-row w-full border-b'
                                                      >
                                                         <span className='flex flex-row w-1/12 justify-center border-l border-r'>
                                                            {scope.quantity}
                                                         </span>
                                                         <span className='flex flex-row w-6/12 justify-center text-center border-r'>
                                                            {scope.description}
                                                         </span>
                                                         <span className='flex flex-row w-2/12 justify-center border-r'>
                                                            {scope.unit_price}
                                                         </span>
                                                         <span className='flex flex-row w-2/12 justify-center border-r'>
                                                            {
                                                               scope.price_before_taxes
                                                            }
                                                         </span>
                                                         <span className='flex flex-row w-2/12 justify-center border-r'>
                                                            {scope.taxes}
                                                         </span>
                                                         <span className='flex flex-row w-2/12 justify-center border-r'>
                                                            {scope.total_price}
                                                         </span>
                                                      </span>
                                                   )
                                                )} */}

                                                <Table>
                                                   <TableHeader>
                                                      <TableRow>
                                                         <TableHead className='w-1/12'>
                                                            Quantity
                                                         </TableHead>
                                                         <TableHead className='w-6/12'>
                                                            Description
                                                         </TableHead>
                                                         <TableHead className='w-2/12'>
                                                            Unit Price
                                                         </TableHead>
                                                         <TableHead className='w-2/12'>
                                                            Before Taxes
                                                         </TableHead>
                                                         <TableHead className='w-2/12'>
                                                            Taxes
                                                         </TableHead>
                                                         <TableHead className='w-2/12'>
                                                            Total Price
                                                         </TableHead>
                                                      </TableRow>
                                                   </TableHeader>
                                                   <TableBody>
                                                      {proposal.scopeOfWork.map(
                                                         (scope, idx) => (
                                                            <TableRow key={idx}>
                                                               <TableCell>
                                                                  {
                                                                     scope.quantity
                                                                  }
                                                               </TableCell>
                                                               <TableCell>
                                                                  {
                                                                     scope.description
                                                                  }
                                                               </TableCell>
                                                               <TableCell>
                                                                  {
                                                                     scope.unit_price
                                                                  }
                                                               </TableCell>
                                                               <TableCell>
                                                                  {
                                                                     scope.price_before_taxes
                                                                  }
                                                               </TableCell>
                                                               <TableCell>
                                                                  {scope.taxes}
                                                               </TableCell>
                                                               <TableCell>
                                                                  {
                                                                     scope.total_price
                                                                  }
                                                               </TableCell>
                                                            </TableRow>
                                                         )
                                                      )}
                                                   </TableBody>
                                                </Table>
                                             </div>
                                          </div>

                                          <div className='grid grid-cols-6 gap-1 w-full pt-4'>
                                             <span className='content-heading'>
                                                Terms & Conditions
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposal.termsConditions
                                                   .length > 0
                                                   ? proposal.termsConditions.map(
                                                        (terms, idx) => (
                                                           <div
                                                              key={idx}
                                                              className='flex  gap-2 items-start'
                                                           >
                                                              <span className=''>
                                                                 <DotFilledIcon
                                                                    size={16}
                                                                    className=' size-4'
                                                                 />
                                                              </span>
                                                              <span className=''>
                                                                 {terms}
                                                              </span>
                                                           </div>
                                                        )
                                                     )
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Delivery Terms
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposal.deliveryTerms.length >
                                                0
                                                   ? proposal.deliveryTerms.map(
                                                        (terms, idx) => (
                                                           <div
                                                              key={idx}
                                                              className='flex  gap-2 items-start'
                                                           >
                                                              <span className=''>
                                                                 <DotFilledIcon
                                                                    size={16}
                                                                    className=' size-4'
                                                                 />
                                                              </span>
                                                              <span className=''>
                                                                 {terms}
                                                              </span>
                                                           </div>
                                                        )
                                                     )
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Payment & Terms
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposal.paymentTerms.length >
                                                0
                                                   ? proposal.paymentTerms.map(
                                                        (terms, idx) => (
                                                           <div
                                                              key={idx}
                                                              className='flex  gap-2 items-start'
                                                           >
                                                              <span className=''>
                                                                 <DotFilledIcon
                                                                    size={16}
                                                                    className=' size-4'
                                                                 />
                                                              </span>
                                                              <span className=''>
                                                                 {terms}
                                                              </span>
                                                           </div>
                                                        )
                                                     )
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Implementation Information
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposal.proposalImplementation
                                                   .length > 0
                                                   ? proposal.proposalImplementation.map(
                                                        (terms, idx) => (
                                                           <div
                                                              key={idx}
                                                              className='flex  gap-2 items-start'
                                                           >
                                                              <span className=''>
                                                                 <DotFilledIcon
                                                                    size={16}
                                                                    className=' size-4'
                                                                 />
                                                              </span>
                                                              <span className=''>
                                                                 {terms}
                                                              </span>
                                                           </div>
                                                        )
                                                     )
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Benefits Information
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposal.keyBenefits.length > 0
                                                   ? proposal.keyBenefits.map(
                                                        (terms, idx) => (
                                                           <div
                                                              key={idx}
                                                              className='flex  gap-2 items-start'
                                                           >
                                                              <span className=''>
                                                                 <DotFilledIcon
                                                                    size={16}
                                                                    className=' size-4'
                                                                 />
                                                              </span>
                                                              <span className=''>
                                                                 {terms}
                                                              </span>
                                                           </div>
                                                        )
                                                     )
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Pros
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposalAnalyse[idx].pros
                                                   .length > 0
                                                   ? proposalAnalyse[
                                                        idx
                                                     ].pros.map((pro, idx) => (
                                                        <div
                                                           key={idx}
                                                           className='flex  gap-2 items-start'
                                                        >
                                                           <span className=''>
                                                              <DotFilledIcon
                                                                 size={16}
                                                                 className=' size-4'
                                                              />
                                                           </span>
                                                           <span className=''>
                                                              {pro}
                                                           </span>
                                                        </div>
                                                     ))
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6 w-full pt-4'>
                                             <span className='content-heading '>
                                                Cons
                                             </span>
                                             <span className=' content-color col-span-5 space-y-1'>
                                                {proposalAnalyse[idx].cons
                                                   .length > 0
                                                   ? proposalAnalyse[
                                                        idx
                                                     ].cons.map((con, idx) => (
                                                        <div
                                                           key={idx}
                                                           className='flex  gap-2 items-start'
                                                        >
                                                           <span className=''>
                                                              <DotFilledIcon
                                                                 size={16}
                                                                 className=' size-4'
                                                              />
                                                           </span>
                                                           <span className=''>
                                                              {con}
                                                           </span>
                                                        </div>
                                                     ))
                                                   : "None"}
                                             </span>
                                          </div>

                                          <div className='grid grid-cols-6'>
                                             <span className='content-heading '>
                                                Contact Information
                                             </span>
                                             {proposal.contactInformation ? (
                                                <span className='flex flex-col gap-2  content-color col-span-5 '>
                                                   <span>
                                                      Submitted by:{" "}
                                                      {
                                                         proposal
                                                            .contactInformation
                                                            .submittedBy
                                                      }
                                                   </span>
                                                   <span>
                                                      Contact:{" "}
                                                      {
                                                         proposal
                                                            .contactInformation
                                                            .contactDetail
                                                      }
                                                   </span>
                                                </span>
                                             ) : (
                                                "None"
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                 </fieldset>
                              ))}
                           </form>
                        </div>
                     </CardContent>
                  )}
               </Card>
            </div>
         </div>
      </>
   );
};

export default GeneralPage;
