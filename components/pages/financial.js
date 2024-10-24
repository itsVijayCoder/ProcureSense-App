"use client";

import { useRouter } from "next/navigation";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";
import {
   Crown,
   SquareArrowOutUpRight,
   Check,
   Star,
   AlignEndHorizontal,
} from "lucide-react";
import { dashboardStore } from "@/stores/dashboard.js";
import { ProposalSidebar } from "./proposal-sidebar";
import { RankingSection } from "@/components/pages/ranking-info/ranking-data";
import { ReasonForSuggestion } from "@/components/pages/ranking-info/reason-for-suggession";
import { SuggestedProposal } from "@/components/pages/ranking-info/suggested-proposal";
import { QuotationCard } from "@/components/pages/financial-quotation/QuotationCard";
import { ProposalAnalysis } from "@/components/pages/proposal-analysis/proposalAnalysis";

const FinancialPage = () => {
   const { selectedFinancialAnalyseData } = dashboardStore();
   const router = useRouter();

   const financialAnalyse = selectedFinancialAnalyseData?.financialAnalyse;
   const financialRanking = selectedFinancialAnalyseData?.financialRanking;
   const overallFinanciallySuitableProposal =
      selectedFinancialAnalyseData?.overallFinanciallySuitableProposal;
   const proposalAnalyse = selectedFinancialAnalyseData?.proposalAnalyse;
   const reasonForFinancialSelection =
      selectedFinancialAnalyseData?.reasonForFinancialSelection;
   const proposal = selectedFinancialAnalyseData?.proposal;

   const fetchProposalCompanyName = (idx) => {
      const proposalName = proposal[idx];
      return proposalName?.companyName;
   };

   const handleSectionScroll = (sectionId) => {
      router.push(`/analysis/#${sectionId}`);
   };

   return (
      <>
         <div className='grid grid-cols-[auto,1fr] gap-4 '>
            <div className='w-full col-span-full'>
               <Card>
                  <CardHeader>
                     <CardTitle>Financial</CardTitle>
                     <CardDescription>
                        Explore financial analysis details to make informed
                        decisions.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className='flex flex-col gap-2'>
                        <form className='grid w-full items-start gap-6 overflow-auto pt-0'>
                           <fieldset className='fieldset'>
                              <legend className='legend'>Basic Metrics</legend>

                              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                                 <QuotationCard
                                    title='Maximum'
                                    quoteAmount={financialAnalyse.maxQuote}
                                    companyName={fetchProposalCompanyName}
                                    quoteCompany={
                                       financialAnalyse.maxQuoteProposal
                                    }
                                 />
                                 <QuotationCard
                                    title='Minimum'
                                    companyName={fetchProposalCompanyName}
                                    quoteAmount={financialAnalyse.minQuote}
                                    quoteCompany={
                                       financialAnalyse.minQuoteProposal
                                    }
                                 />

                                 <QuotationCard
                                    title='Average'
                                    quoteAmount={financialAnalyse.avgQuote}
                                 />
                              </div>
                           </fieldset>

                           <fieldset className='fieldset'>
                              <legend className='legend'>
                                 Ranking Information
                              </legend>
                              <div className='flex flex-col gap-3 text-sm'>
                                 <SuggestedProposal
                                    companyName={fetchProposalCompanyName}
                                    overallSuitableProposal={
                                       overallFinanciallySuitableProposal
                                    }
                                 >
                                    <ReasonForSuggestion
                                       reasonData={reasonForFinancialSelection}
                                    />
                                 </SuggestedProposal>

                                 <RankingSection
                                    rankingData={financialRanking}
                                    companyName={fetchProposalCompanyName}
                                    analyse={proposalAnalyse}
                                 />
                              </div>
                           </fieldset>

                           <ProposalAnalysis
                              proposalAnalysisData={proposalAnalyse}
                              title='Financial'
                           />
                        </form>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   );
};

export default FinancialPage;
