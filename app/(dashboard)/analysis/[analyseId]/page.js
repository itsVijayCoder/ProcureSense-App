"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowUp01, ArrowUpNarrowWide, Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/pages/loader";

import { dashboardStore } from "@/stores/dashboard.js";
import { fetchAnalyse } from "@/utils/dashboard";
import GeneralPage from "@/components/pages/general";
import FinancialPage from "@/components/pages/financial";
import RiskPage from "@/components/pages/risk";
import { ProposalSidebar } from "@/components/pages/proposal-sidebar";
import { ScrollToTop } from "@/components/scroll-to-top";

const AnalysisPage = () => {
   const {
      analyseList,
      selectedAnalyseId,
      selectedGeneralAnalyseData,
      selectedFinancialAnalyseData,
      selectedRiskAnalyseData,
      setSelectedGeneralAnalyseData,
      setSelectedFinancialAnalyseData,
      setSelectedRiskAnalyseData,
   } = dashboardStore();
   const useEffectRan = useRef(false);

   const [analyseId, setAnalyseId] = useState(selectedAnalyseId);
   const [isLoading, setIsLoading] = useState(false);
   const [isStoreUpdated, setIsStoreUpdated] = useState(false);
   const filteredAnalyseList = analyseList.filter(
      (analyse) => analyse.status === "completed"
   );
   const [tabValue, setTabValue] = useState("general");

   const generalProposal = selectedGeneralAnalyseData?.proposal;
   const financialProposal = selectedFinancialAnalyseData?.proposalAnalyse;
   const riskProposal = selectedRiskAnalyseData?.proposalAnalyse;

   const getProposalData = () => {
      switch (tabValue) {
         case "general":
            return selectedGeneralAnalyseData?.proposal || [];
         case "financial":
            return selectedFinancialAnalyseData?.proposalAnalyse || [];
         case "risk":
            return selectedRiskAnalyseData?.proposalAnalyse || [];
         default:
            return [];
      }
   };

   const handleAnalyseSelection = async (id) => {
      setAnalyseId(id);
      await fetchSelectedAnalyseData(id);
   };

   const fetchSelectedAnalyseData = async (id) => {
      try {
         setIsLoading(true);
         setIsStoreUpdated(false);
         const analyseData = await fetchAnalyse(id);
         setSelectedGeneralAnalyseData({
            analyse: {
               name: analyseData.data.name,
               description: analyseData.data.description,
               tags: analyseData.data.tags,
               createdAt: analyseData.data.created_at,
               updatedAt: analyseData.data.updated_at,
            },
            requestForProposal: analyseData.data.rp_analyse,
            proposal: analyseData.data.p_analyse,
            ranking: analyseData.data.analyse.ranking,
            reasonForOverallSelection:
               analyseData.data.analyse.reasonForOverallSelection,
            overallSuitableProposal:
               analyseData.data.analyse.overallSuitableProposal,
            proposalAnalyse: analyseData.data.analyse.proposalAnalyse,
         });
         setSelectedFinancialAnalyseData({
            financialAnalyse: analyseData.data.analyse.financialAnalyse,
            proposal: analyseData.data.p_analyse,
            financialRanking: analyseData.data.analyse.financialRanking,
            overallFinanciallySuitableProposal:
               analyseData.data.analyse.overallFinanciallySuitableProposal,
            proposalAnalyse: analyseData.data.analyse.proposalAnalyse,
            reasonForFinancialSelection:
               analyseData.data.analyse.reasonForFinancialSelection,
         });
         setSelectedRiskAnalyseData({
            riskAssessmentRanking:
               analyseData.data.analyse.riskAssessmentRanking,
            proposal: analyseData.data.p_analyse,
            overallRiskAssessmentSuitableProposal:
               analyseData.data.analyse.overallRiskAssessmentSuitableProposal,
            proposalAnalyse: analyseData.data.analyse.proposalAnalyse,
            reasonForRiskAssessmentSelection:
               analyseData.data.analyse.reasonForRiskAssessmentSelection,
         });
         setIsLoading(false);
         setIsStoreUpdated(true);
      } catch (error) {
         console.error(error);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (!useEffectRan.current) {
         const fetchAnalyseData = async () => {
            if (
               filteredAnalyseList
                  .map((analyse) => analyse.id)
                  .includes(selectedAnalyseId)
            ) {
               await fetchSelectedAnalyseData(selectedAnalyseId);
            } else {
               setAnalyseId(null);
            }
         };
         fetchAnalyseData();
         useEffectRan.current = true;
      }
   }, []);

   return (
      <>
         <div className='flex flex-row items-center justify-between no-scrollbar'>
            <h1 className='text-lg font-semibold md:text-2xl'>Analysis</h1>
            {/* {filteredAnalyseList.length > 0 && (
               <Select
                  onValueChange={(id) => handleAnalyseSelection(id)}
                  defaultValue={analyseId}
               >
                  <SelectTrigger className='w-[380px] bg-white'>
                     <SelectValue placeholder='Select analyse' />
                  </SelectTrigger>
                  <SelectContent className='w-[380px] bg-white'>
                     {filteredAnalyseList.map((analyse, idx) => (
                        <SelectItem key={idx} value={analyse.id}>
                           {analyse.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            )} */}
         </div>
         {isLoading ? (
            <Loader />
         ) : analyseId ? (
            <div className='flex flex-1 relative'>
               <div className='flex flex-col gap-4 w-full'>
                  <Tabs
                     defaultValue='general'
                     className='w-full'
                     onValueChange={(value) => setTabValue(value)}
                  >
                     <div className='flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-start sticky top-14  mb-4 pt-3'>
                        <div className='order-2 md:order-1'>
                           <ProposalSidebar proposalData={getProposalData()} />
                        </div>

                        <TabsList className='sticky top-16 shadow-lg order-1 md:order-2 md:h-12 md:px-2'>
                           <TabsTrigger value='general'>General</TabsTrigger>
                           <TabsTrigger value='financial'>
                              Financial
                           </TabsTrigger>
                           <TabsTrigger value='risk'>Risk</TabsTrigger>
                        </TabsList>
                     </div>

                     <TabsContent value='general'>
                        {isStoreUpdated && !isLoading && <GeneralPage />}
                        {!isStoreUpdated && isLoading && <Loader />}
                     </TabsContent>
                     <TabsContent value='financial'>
                        <FinancialPage />
                     </TabsContent>
                     <TabsContent value='risk'>
                        <RiskPage />
                     </TabsContent>
                  </Tabs>

                  <ScrollToTop />
               </div>
            </div>
         ) : (
            <div className='flex flex-1 items-center justify-center'>
               <div className='flex flex-col items-center gap-1 text-center'>
                  <h3 className='text-2xl font-bold tracking-tight'>
                     You have no analysis
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                     You can start adding analysis to your dashboard to get
                     insights on your proposals.
                  </p>
                  <Button size='sm' className='flex flex-row gap-2'>
                     <Plus size={12} absoluteStrokeWidth={1} />
                     <Link href='/add-analysis'>Add Analysis</Link>
                  </Button>
               </div>
            </div>
         )}
      </>
   );
};

export default AnalysisPage;
