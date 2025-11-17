"use client";

import {
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useRef, useState } from "react";
import {
   ChevronRight,
   ChevronLeft,
   Undo,
   BarChartHorizontalBig,
   RotateCw,
} from "lucide-react";
import { addAnalyseStore } from "@/stores/addAnalyse";

const Step4Page = ({
   handleProposalAnalyseDataChange,
   handleNext,
   handlePrevious,
   isLoading,
}) => {
   const { proposalData, setProposalData: updateStoreProposalData } = addAnalyseStore();
   const totalProposals = Array.isArray(proposalData) ? proposalData.length : 0;
   const [currentProposal, setCurrentProposal] = useState(0);
   const [currentProposalData, setCurrentProposalData] = useState(
      totalProposals > 0 ? proposalData[0] : null
   );
   
   // Track if we're currently syncing to prevent infinite loops
   const isSyncingRef = useRef(false);
   // Track the last loaded proposal index to detect navigation
   const lastLoadedProposalRef = useRef(-1);

   const [companyName, setCompanyName] = useState("");
   const [submissionDate, setSubmissionDate] = useState("");
   const [companyAddress, setCompanyAddress] = useState("");
   const [companyEmail, setCompanyEmail] = useState("");
   const [companyWebsite, setCompanyWebsite] = useState("");
   const [termsConditions, setTermsConditions] = useState("");
   const [paymentTerms, setPaymentTerms] = useState("");
   const [deliveryTerms, setDeliveryTerms] = useState("");
   const [implementationDetails, setImplementationDetails] = useState("");
   const [scopeOfWork, setScopeOfWork] = useState([]);
   const [keyBenefits, setKeyBenefits] = useState("");
   const [contactDetail, setContactDetail] = useState("");
   const [submittedBy, setSubmittedBy] = useState("");

   const toArrayFromMultiline = useCallback((value, fallback = []) => {
      if (typeof value === "string") {
         const trimmed = value
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
         if (trimmed.length > 0) {
            return trimmed;
         }
      }
      return Array.isArray(fallback) ? fallback : [];
   }, []);

   const applyProposalToForm = useCallback((proposal) => {
      if (!proposal) {
         return;
      }
      setCompanyName(proposal.companyName || "");
      setSubmissionDate(proposal.submissionDate || "");
      setCompanyAddress(proposal.companyAddress || "");
      setCompanyEmail(proposal.companyEmail || "");
      setCompanyWebsite(proposal.companyWebsite || "");
      setTermsConditions(
         Array.isArray(proposal?.termsConditions)
            ? proposal.termsConditions.join("\n")
            : proposal?.termsConditions || ""
      );
      setPaymentTerms(
         Array.isArray(proposal?.paymentTerms)
            ? proposal.paymentTerms.join("\n")
            : proposal?.paymentTerms || ""
      );
      setDeliveryTerms(
         Array.isArray(proposal?.deliveryTerms)
            ? proposal.deliveryTerms.join("\n")
            : proposal?.deliveryTerms || ""
      );
      setImplementationDetails(
         Array.isArray(proposal?.proposalImplementation)
            ? proposal.proposalImplementation.join("\n")
            : proposal?.proposalImplementation || ""
      );
      setScopeOfWork(
         Array.isArray(proposal.scopeOfWork) ? proposal.scopeOfWork : []
      );
      setKeyBenefits(
         Array.isArray(proposal?.keyBenefits)
            ? proposal.keyBenefits.join("\n")
            : proposal?.keyBenefits || ""
      );
      setContactDetail(proposal?.contactInformation?.contactDetail || "");
      setSubmittedBy(proposal?.contactInformation?.submittedBy || "");
   }, []);

   // Sync form changes to store and parent - defined early so navigation handlers can use it
   const syncChangesToStore = useCallback(() => {
      if (totalProposals === 0 || isSyncingRef.current) {
         return;
      }
      
      const existingProposal = proposalData[currentProposal];
      if (!existingProposal) {
         return;
      }
      
      const updatedProposal = {
         ...existingProposal,
         companyName,
         submissionDate,
         companyAddress,
         companyEmail,
         companyWebsite,
         termsConditions: toArrayFromMultiline(
            termsConditions,
            existingProposal.termsConditions
         ),
         paymentTerms: toArrayFromMultiline(
            paymentTerms,
            existingProposal.paymentTerms
         ),
         deliveryTerms: toArrayFromMultiline(
            deliveryTerms,
            existingProposal.deliveryTerms
         ),
         proposalImplementation: toArrayFromMultiline(
            implementationDetails,
            existingProposal.proposalImplementation
         ),
         scopeOfWork,
         keyBenefits: toArrayFromMultiline(
            keyBenefits,
            existingProposal.keyBenefits
         ),
         contactInformation: {
            ...existingProposal.contactInformation,
            contactDetail,
            submittedBy,
         },
      };

      const payload = proposalData.map((proposal, index) =>
         index === currentProposal ? updatedProposal : proposal
      );
      
      // Prevent re-triggering this effect when we update the store
      isSyncingRef.current = true;
      updateStoreProposalData(payload);
      handleProposalAnalyseDataChange(payload);
      
      // Reset sync flag after a brief delay
      setTimeout(() => {
         isSyncingRef.current = false;
      }, 0);
   }, [
      companyName,
      submissionDate,
      companyAddress,
      companyEmail,
      companyWebsite,
      contactDetail,
      submittedBy,
      termsConditions,
      paymentTerms,
      deliveryTerms,
      implementationDetails,
      scopeOfWork,
      keyBenefits,
      currentProposal,
      proposalData,
      totalProposals,
      toArrayFromMultiline,
      updateStoreProposalData,
      handleProposalAnalyseDataChange,
   ]);

   const handleNextProposal = () => {
      if (totalProposals === 0) {
         return;
      }
      
      // Ensure current changes are synced before navigating
      syncChangesToStore();
      
      if (currentProposal >= totalProposals - 1) {
         // Small delay to ensure sync completes before final submission
         setTimeout(() => {
            handleNext();
         }, 50);
         return;
      }
      
      // Mark that we're about to navigate to force reload of next proposal
      lastLoadedProposalRef.current = -1;
      setCurrentProposal((prev) => prev + 1);
   };

   const handlePreviousProposal = () => {
      if (totalProposals === 0) {
         return;
      }
      
      // Ensure current changes are synced before navigating
      syncChangesToStore();
      
      if (currentProposal === 0) {
         setTimeout(() => {
            handlePrevious();
         }, 50);
         return;
      }
      
      // Mark that we're about to navigate to force reload of previous proposal
      lastLoadedProposalRef.current = -1;
      setCurrentProposal((prev) => prev - 1);
   };

   const handleRestoreDefault = () => {
      applyProposalToForm(currentProposalData);
   };

   const handleScopeOfWorkChange = (idx, key, value) => {
      setScopeOfWork((prevScopeOfWork) => {
         const updatedScopeOfWork = prevScopeOfWork.map((scope, index) => {
            if (index === idx) {
               // Convert numeric fields from string to number for internal state
               const numericFields = ['quantity', 'unit_price', 'price_before_taxes', 'taxes', 'total_price'];
               const finalValue = numericFields.includes(key) 
                  ? (value === '' ? 0 : parseFloat(value) || 0)
                  : value;
               
               return { ...scope, [key]: finalValue };
            }
            return scope;
         });
         return updatedScopeOfWork;
      });
   };

   useEffect(() => {
      if (totalProposals === 0) {
         return;
      }
      
      const safeIndex = Math.min(currentProposal, totalProposals - 1);
      if (safeIndex !== currentProposal) {
         setCurrentProposal(safeIndex);
         return;
      }
      
      // Only reload form if we've navigated to a different proposal
      if (lastLoadedProposalRef.current === safeIndex && !isSyncingRef.current) {
         return;
      }
      
      const proposal = proposalData[safeIndex];
      if (!proposal) {
         return;
      }
      
      // Mark this proposal as loaded
      lastLoadedProposalRef.current = safeIndex;
      setCurrentProposalData(proposal);
      
      // Temporarily disable sync while loading form
      isSyncingRef.current = true;
      applyProposalToForm(proposal);
      
      // Re-enable sync after form is loaded
      setTimeout(() => {
         isSyncingRef.current = false;
      }, 100);
   }, [applyProposalToForm, currentProposal, proposalData, totalProposals]);

   useEffect(() => {
      syncChangesToStore();
   }, [syncChangesToStore]);

   return (
      <div>
         <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-2'>
               <CardTitle>Step 4</CardTitle>
               <CardDescription>
                  Check the details of the proposal {currentProposal + 1}{" "}
                  document.{" "}
               </CardDescription>
            </div>
            <div className='flex flex-row gap-5'>
               <Button
                  className='flex flex-row gap-2'
                  onClick={() => {
                     handleRestoreDefault();
                  }}
               >
                  <Undo size={14} />
                  <span>Restore Default</span>
               </Button>
            </div>
         </CardHeader>
         <CardContent>
            <div className='grid w-full items-center gap-1.5'>
               <form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0'>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Basic Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-4/6'>
                           <Label
                              htmlFor='company_name'
                              className='flex flex-row gap-3 items-center'
                           >
                              Company Name
                              {companyName === "" && (
                                 <Badge variant='destructive'>
                                    No company name available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='company_name'
                              placeholder='Enter company name'
                              value={companyName}
                              onChange={(e) => {
                                 setCompanyName(e.target.value);
                              }}
                           />
                        </div>
                        <div className='grid gap-3 w-2/6'>
                           <Label
                              htmlFor='submission_date'
                              className='flex flex-row gap-3 items-center'
                           >
                              Submission Date
                              {submissionDate === "" && (
                                 <Badge variant='destructive'>
                                    No submission date available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='submission_date'
                              placeholder='Enter submission date'
                              value={submissionDate}
                              onChange={(e) => {
                                 setSubmissionDate(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                     <div className='grid gap-3'>
                        <Label
                           htmlFor='company_address'
                           className='flex flex-row gap-3 items-center'
                        >
                           Company Address
                           {companyAddress === "" && (
                              <Badge variant='destructive'>
                                 No company address available
                              </Badge>
                           )}
                        </Label>
                        <Input
                           id='company_address'
                           placeholder='Enter company address'
                           value={companyAddress}
                           onChange={(e) => {
                              setCompanyAddress(e.target.value);
                           }}
                        />
                     </div>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-4/6'>
                           <Label
                              htmlFor='company_email'
                              className='flex flex-row gap-3 items-center'
                           >
                              Company Email
                              {companyEmail === "" && (
                                 <Badge variant='destructive'>
                                    No company email available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='company_email'
                              placeholder='Enter company email'
                              value={companyEmail}
                              onChange={(e) => {
                                 setCompanyEmail(e.target.value);
                              }}
                           />
                        </div>
                        <div className='grid gap-3 w-2/6'>
                           <Label
                              htmlFor='company_website'
                              className='flex flex-row gap-3 items-center'
                           >
                              Company website
                              {companyWebsite === "" && (
                                 <Badge variant='destructive'>
                                    No company website available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='company_website'
                              placeholder='Enter company website'
                              value={companyWebsite}
                              onChange={(e) => {
                                 setCompanyWebsite(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Contact Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-3/6'>
                           <Label htmlFor='submitted_by'>Submitted by</Label>
                           <Input
                              id='submitted_by'
                              placeholder='Enter submitted by'
                              value={submittedBy}
                              onChange={(e) => {
                                 setSubmittedBy(e.target.value);
                              }}
                           />
                        </div>
                        <div className='grid gap-3 w-3/6'>
                           <Label htmlFor='contact'>Contact</Label>
                           <Input
                              id='contact_details'
                              placeholder='Enter contact details'
                              value={contactDetail}
                              onChange={(e) => {
                                 setContactDetail(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Description Information
                     </legend>
                     {scopeOfWork.map((scope, idx) => (
                        <div key={idx} className='flex flex-row gap-3'>
                           <div className='grid gap-3 w-1/12'>
                              <Label htmlFor='quantity'>Quantity</Label>
                              <Input
                                 id='quantity'
                                 type='number'
                                 step='1'
                                 placeholder='Quantity'
                                 value={scope.quantity}
                                 onChange={(e) => {
                                    handleScopeOfWorkChange(
                                       idx,
                                       "quantity",
                                       e.target.value
                                    );
                                 }}
                              />
                           </div>
                           <div className='grid gap-3 w-5/12'>
                              <Label htmlFor='description'>Description</Label>
                              <Input
                                 id='description'
                                 placeholder='Description'
                                 value={scope.description}
                                 onChange={(e) => {
                                    handleScopeOfWorkChange(
                                       idx,
                                       "description",
                                       e.target.value
                                    );
                                 }}
                              />
                           </div>
                           <div className='grid gap-3 w-2/12'>
                              <Label htmlFor='description'>Per unit rate</Label>
                              <Input
                                 id='unit_price'
                                 type='number'
                                 step='0.01'
                                 placeholder='Per unit rate'
                                 value={scope.unit_price}
                                 onChange={(e) => {
                                    handleScopeOfWorkChange(
                                       idx,
                                       "unit_price",
                                       e.target.value
                                    );
                                 }}
                              />
                           </div>
                           <div className='grid gap-3 w-1/12'>
                              <Label htmlFor='description'>Bfr Taxes</Label>
                              <Input
                                 id='price_before_taxes'
                                 type='number'
                                 step='0.01'
                                 placeholder='Before Taxes'
                                 value={scope.price_before_taxes}
                                 onChange={(e) => {
                                    handleScopeOfWorkChange(
                                       idx,
                                       "price_before_taxes",
                                       e.target.value
                                    );
                                 }}
                              />
                           </div>
                           <div className='grid gap-3 w-1/12'>
                              <Label htmlFor='description'>Taxes</Label>
                              <Input
                                 id='taxes'
                                 type='number'
                                 step='0.01'
                                 placeholder='Taxes'
                                 value={scope.taxes}
                                 onChange={(e) => {
                                    handleScopeOfWorkChange(
                                       idx,
                                       "taxes",
                                       e.target.value
                                    );
                                 }}
                              />
                           </div>
                           <div className='grid gap-3 w-2/12'>
                              <Label htmlFor='description'>Total Amount</Label>
                              <Input
                                 id='total_price'
                                 type='number'
                                 step='0.01'
                                 placeholder='Total Amount'
                                 value={scope.total_price}
                                 onChange={(e) => {
                                    handleScopeOfWorkChange(
                                       idx,
                                       "total_price",
                                       e.target.value
                                    );
                                 }}
                              />
                           </div>
                        </div>
                     ))}
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Terms & conditions Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-full'>
                           <Label htmlFor='terms_conditions'>
                              Terms & Conditions details
                           </Label>
                           <Textarea
                              id='terms_conditions'
                              placeholder='Enter terms & conditions details'
                              value={termsConditions}
                              onChange={(e) => {
                                 setTermsConditions(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Payment Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-full'>
                           <Label htmlFor='payment_terms'>Payment terms</Label>
                           <Textarea
                              id='payment_terms'
                              placeholder='Enter payment details'
                              value={paymentTerms}
                              onChange={(e) => {
                                 setPaymentTerms(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Delivery Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-full'>
                           <Label htmlFor='delivery_terms'>
                              Delivery terms
                           </Label>
                           <Textarea
                              id='delivery_terms'
                              placeholder='Enter delivery details'
                              value={deliveryTerms}
                              onChange={(e) => {
                                 setDeliveryTerms(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Implementation Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-full'>
                           <Label htmlFor='implementation_details'>
                              Implementation Details
                           </Label>
                           <Textarea
                              id='implementation_details'
                              placeholder='Enter implementation details'
                              value={implementationDetails}
                              onChange={(e) => {
                                 setImplementationDetails(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Key benefits Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-full'>
                           <Label htmlFor='key_benefits'>
                              Key benefits Details
                           </Label>
                           <Textarea
                              id='key_benefits'
                              placeholder='Enter Key benefits details'
                              value={keyBenefits}
                              onChange={(e) => {
                                 setKeyBenefits(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
               </form>
            </div>
         </CardContent>
         <CardFooter className='flex flex-row w-full justify-between mt-4'>
            <Button
               variant='outline'
               className='flex flex-row gap-2'
               onClick={() => {
                  handlePreviousProposal();
               }}
            >
               <ChevronLeft size={20} />
               <span>Previous</span>
            </Button>
            <Button
               className='flex flex-row gap-2'
               onClick={() => {
                  handleNextProposal();
               }}
               disabled={isLoading}
            >
               {isLoading ? (
                  <>
                     <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                     Please wait ...
                  </>
               ) : (
                  <>
                     {currentProposal === proposalData.length - 1 ? (
                        <>
                           <span>Start Analyse</span>
                           <BarChartHorizontalBig size={18} />
                        </>
                     ) : (
                        <>
                           <span>Next</span>
                           <ChevronRight size={20} />
                        </>
                     )}
                  </>
               )}
            </Button>
         </CardFooter>
      </div>
   );
};

export default Step4Page;
