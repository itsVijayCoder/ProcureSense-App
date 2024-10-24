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
import { ProposalSidebar } from "@/components/pages/proposal-sidebar";
import { RankingSection } from "@/components/pages/ranking-info/ranking-data";
import { ReasonForSuggestion } from "@/components/pages/ranking-info/reason-for-suggession";
import { SuggestedProposal } from "@/components/pages/ranking-info/suggested-proposal";
import { ProposalAnalysis } from "@/components/pages/proposal-analysis/proposalAnalysis";

const RiskPage = () => {
   const { selectedRiskAnalyseData } = dashboardStore();
   const router = useRouter();

   const riskAssessmentRanking = selectedRiskAnalyseData?.riskAssessmentRanking;
   const overallRiskAssessmentSuitableProposal =
      selectedRiskAnalyseData?.overallRiskAssessmentSuitableProposal;
   const proposalAnalyse = selectedRiskAnalyseData?.proposalAnalyse;
   const reasonForRiskAssessmentSelection =
      selectedRiskAnalyseData?.reasonForRiskAssessmentSelection;
   const proposal = selectedRiskAnalyseData?.proposal;

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
                     <CardTitle>Risk Assessment</CardTitle>
                     <CardDescription>
                        Explore risk analysis details to make informed
                        decisions.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className='flex flex-col gap-2'>
                        <form className='grid w-full items-start gap-6 overflow-auto pt-0'>
                           <fieldset className='fieldset'>
                              <legend className='legend'>
                                 Ranking Information
                              </legend>
                              <div className='flex flex-col gap-3 text-sm'>
                                 <SuggestedProposal
                                    companyName={fetchProposalCompanyName}
                                    overallSuitableProposal={
                                       overallRiskAssessmentSuitableProposal
                                    }
                                 >
                                    <ReasonForSuggestion
                                       reasonData={
                                          reasonForRiskAssessmentSelection
                                       }
                                    />
                                 </SuggestedProposal>
                                 {/* <div className='flex flex-col gap-3 w-full'>
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
                                                handleSectionScroll(
                                                   `proposal${
                                                      overallRiskAssessmentSuitableProposal +
                                                      1
                                                   }`
                                                );
                                             }}
                                          >
                                             Proposal{" "}
                                             {overallRiskAssessmentSuitableProposal +
                                                1}{" "}
                                             -{" "}
                                             <span className='tracking-wider'>
                                                {fetchProposalCompanyName(
                                                   overallRiskAssessmentSuitableProposal
                                                )}
                                             </span>
                                             <SquareArrowOutUpRight
                                                size={14}
                                                className='text-primary'
                                             />
                                          </span>
                                       </div>

                                       <ReasonForSuggestion
                                          reasonData={
                                             reasonForRiskAssessmentSelection
                                          }
                                       />
                                    </div>
                                 </div> */}

                                 <RankingSection
                                    rankingData={riskAssessmentRanking}
                                    companyName={fetchProposalCompanyName}
                                    analyse={proposalAnalyse}
                                 />
                              </div>
                           </fieldset>

                           <ProposalAnalysis
                              proposalAnalysisData={proposalAnalyse}
                              title='Risk'
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

export default RiskPage;
