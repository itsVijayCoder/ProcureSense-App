"use client";

import { useRouter } from "next/navigation";
import Step1Page from "@/components/pages/step1";
import Step2Page from "@/components/pages/step2";
import Step3Page from "@/components/pages/step3";
import Step4Page from "@/components/pages/step4";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, RotateCw, Save } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { addAnalyseStore } from "@/stores/addAnalyse";
import { toast } from "sonner";
import {
   ingestResquestForProposal,
   ingestProposal,
   fetchResquestForProposal,
   fetchProposal,
   editAnalyse,
   editProposal,
   editResquestForProposal,
} from "@/utils/addAnalyse";
import { startAnalyse } from "@/utils/dashboard";

const AddAnalysisPage = () => {
   const router = useRouter();
   const useEffectRan = useRef(false);

   const {
      setAnalyseId,
      setAnalyseData,
      setRequestForProposalData,
      setProposalData,
      setRequestForProposalFileList,
      setProposalFileList,
   } = addAnalyseStore();
   const { analyseId, requestForProposalFileList, proposalFileList, stage } =
      addAnalyseStore();

   const [updatedAnalyseData, setUpdatedAnalyseData] = useState({});
   const [updatedRequestForProposalData, setUpdatedRequestForProposalData] =
      useState({});
   const [updatedProposalData, setUpdatedProposalData] = useState({});
   const [currentStep, setCurrentStep] = useState(stage);
   const [isButtonLoading, setIsButtonLoading] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const handleNext = () => {
      if (currentStep === 4) return;

      setCurrentStep(currentStep + 1);
   };

   const handlePrevious = () => {
      if (currentStep === 1) return;

      setCurrentStep(currentStep - 1);
   };

   const fetchResquestForProposalData = async (id) => {
      try {
         const response = await fetchResquestForProposal(id);
         setRequestForProposalData(response.data.rp);
         setAnalyseData(response.data.analyse);
      } catch (error) {
         console.error(error);
         toast.error("Error while fetching request for proposal data !");
      }
   };

   const fetchProposalData = async (id) => {
      try {
         const response = await fetchProposal(id);
         setProposalData(response.data);
      } catch (error) {
         console.error(error);
         toast.error("Error while fetching proposal data !");
      }
   };

   const handleStep1Next = async () => {
      setIsButtonLoading(true);
      let payload = new FormData();

      if (requestForProposalFileList.length !== 1) {
         toast.error("Please upload a request for proposal file !");
         setIsButtonLoading(false);
         return;
      }

      requestForProposalFileList.forEach((file) => {
         payload.append("file", file);
      });

      try {
         const response = await ingestResquestForProposal(payload);
         setAnalyseId(response.data.id);
         await fetchResquestForProposalData(response.data.id);
         setIsButtonLoading(false);
         handleNext();
      } catch (error) {
         console.error(error);
         toast.error(
            "Error while uploading request for proposal ! Please try again."
         );
         setIsButtonLoading(false);
      }
   };

   const handleStep2Previous = () => {
      setRequestForProposalFileList([]);
      handlePrevious();
   };

   const handleStep2Next = async () => {
      try {
         setIsButtonLoading(true);
         let analysePayload = { id: analyseId, ...updatedAnalyseData };
         let requestForProposalPayload = {
            id: analyseId,
            ...updatedRequestForProposalData,
         };

         if (!analysePayload.name) {
            toast.error("Please enter a name for the analysis !");
            return;
         } else if (!analysePayload.description) {
            toast.error("Please enter a description for the analysis !");
            return;
         } else if (!analysePayload.tags && analysePayload.tags.length === 0) {
            toast.error("Please enter tags for the analysis !");
            return;
         }

         try {
            await editAnalyse(analysePayload);
         } catch (error) {
            console.error(error);
            toast.error(
               "Error while saving analysis information ! Please try again."
            );
         }

         try {
            await editResquestForProposal(requestForProposalPayload);
         } catch (error) {
            console.error(error);
            toast.error(
               "Error while saving request for proposal information ! Please try again."
            );
         }
         setIsButtonLoading(false);
         handleNext();
      } catch (error) {
         console.error(error);
         toast.error(
            "Error while saving request for proposal information ! Please try again."
         );
         setIsButtonLoading(false);
      }
   };

   const handleStep3Next = async () => {
      setIsButtonLoading(true);
      let payload = new FormData();

      if (proposalFileList.length === 0) {
         toast.error("Please upload proposal file !");
         setIsButtonLoading(false);
         return;
      }

      proposalFileList.forEach((file) => {
         payload.append("file", file);
      });

      payload.append("id", analyseId);

      try {
         await ingestProposal(payload);
         await fetchProposalData(analyseId);
         setIsButtonLoading(false);
         handleNext();
      } catch (error) {
         console.error(error);
         toast.error("Error while uploading proposal ! Please try again.");
         setIsButtonLoading(false);
      }
   };

   const handleStep4Next = async () => {
      try {
         setIsButtonLoading(true);

         let proposalPayload = {
            id: analyseId,
            p_analyse: updatedProposalData,
         };

         try {
            await editProposal(proposalPayload);
         } catch (error) {
            console.error(error);
            toast.error(
               "Error while saving analysis information ! Please try again."
            );
         }

         try {
            await startAnalyse(analyseId);
            toast.success(
               "Analysis started successfully ! You can view the analysis in the analysis page."
            );
            setAnalyseId("");
            setAnalyseData({});
            setRequestForProposalData({});
            setProposalData([]);
            setRequestForProposalFileList([]);
            setProposalFileList([]);
            setIsButtonLoading(false);
            router.push("/analysis?refresh=true");
         } catch (error) {
            console.error(error);
            toast.error("Error while starting analysis ! Please try again.");
            setIsButtonLoading(false);
         }
      } catch (error) {
         console.error(error);
         toast.error(
            "Error while saving proposal information ! Please try again."
         );
         setIsButtonLoading(false);
      }
   };

   useEffect(() => {
      const handleEditAnalyse = async () => {
         setIsLoading(true);
         if (stage === 2) {
            await fetchResquestForProposalData(analyseId);
         } else if (stage === 4) {
            await fetchProposalData(analyseId);
         }
         setIsLoading(false);
      };
      if (!useEffectRan.current) {
         useEffectRan.current = true;
         handleEditAnalyse();
      }
   }, []);

   return (
      <div className='flex flex-col gap-3 w-full item-center justify-center'>
         <div className='flex flex-col gap-1'>
            <h1 className='text-lg font-semibold md:text-2xl'>Add Analysis</h1>
            <span className='text-sm text-gray-500'>Add a new analysis</span>
         </div>
         {!isLoading && (
            <div className='flex flex-col justify-center items-center gap-2'>
               {currentStep === 1 && (
                  <Card className='w-[80%]'>
                     <Step1Page />
                     <CardFooter className='flex flex-row w-full justify-end mt-4'>
                        <Button
                           className='flex flex-row gap-2'
                           onClick={() => {
                              handleStep1Next();
                           }}
                           disabled={isButtonLoading}
                        >
                           {isButtonLoading ? (
                              <>
                                 <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                                 Please wait ...
                              </>
                           ) : (
                              <>
                                 <span>Submit & Next</span>
                                 <ChevronRight size={20} />
                              </>
                           )}
                        </Button>
                     </CardFooter>
                  </Card>
               )}
               {currentStep === 2 && (
                  <Card className='w-[80%]'>
                     <Step2Page
                        handleAnalyseDataChange={(analyseData) => {
                           setUpdatedAnalyseData(analyseData);
                        }}
                        handleRequestForProposalDataChange={(
                           requestForProposalData
                        ) => {
                           setUpdatedRequestForProposalData(
                              requestForProposalData
                           );
                        }}
                     />
                     <CardFooter className='flex flex-row w-full justify-between mt-4'>
                        <Button
                           variant='outline'
                           className='flex flex-row gap-2'
                           onClick={() => {
                              handleStep2Previous();
                           }}
                        >
                           <ChevronLeft size={20} />
                           <span>Previous</span>
                        </Button>
                        <Button
                           className='flex flex-row gap-2'
                           onClick={() => {
                              handleStep2Next();
                           }}
                           disabled={isButtonLoading}
                        >
                           {isButtonLoading ? (
                              <>
                                 <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                                 Please wait ...
                              </>
                           ) : (
                              <>
                                 <span>Submit & Next</span>
                                 <ChevronRight size={20} />
                              </>
                           )}
                        </Button>
                     </CardFooter>
                  </Card>
               )}
               {currentStep === 3 && (
                  <Card className='w-[80%]'>
                     <Step3Page />
                     <CardFooter className='flex flex-row w-full justify-between mt-4'>
                        <Button
                           variant='outline'
                           className='flex flex-row gap-2'
                           onClick={() => {
                              handlePrevious();
                           }}
                        >
                           <ChevronLeft size={20} />
                           <span>Previous</span>
                        </Button>
                        <Button
                           className='flex flex-row gap-2'
                           onClick={() => {
                              handleStep3Next();
                           }}
                           disabled={isButtonLoading}
                        >
                           {isButtonLoading ? (
                              <>
                                 <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                                 Please wait ...
                              </>
                           ) : (
                              <>
                                 <span>Submit & Next</span>
                                 <ChevronRight size={20} />
                              </>
                           )}
                        </Button>
                     </CardFooter>
                  </Card>
               )}
               {currentStep === 4 && (
                  <Card className='w-[80%]'>
                     <Step4Page
                        handleProposalAnalyseDataChange={(proposalData) => {
                           setUpdatedProposalData(proposalData);
                        }}
                        handlePrevious={() => {
                           handlePrevious();
                        }}
                        handleNext={() => {
                           handleStep4Next();
                        }}
                        isLoading={isButtonLoading}
                     />
                  </Card>
               )}
            </div>
         )}
      </div>
   );
};

export default AddAnalysisPage;
