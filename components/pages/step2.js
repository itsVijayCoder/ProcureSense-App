"use client";

import {
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { addAnalyseStore } from "@/stores/addAnalyse";

const maxTags = 6;

const Step2Page = ({
   handleAnalyseDataChange,
   handleRequestForProposalDataChange,
}) => {
   const { analyseData, requestForProposalData } = addAnalyseStore();
   const { setAnalyseData, setRequestForProposalData } = addAnalyseStore();

   console.log("requestForProposalData", requestForProposalData);

   const useEffectRan = useRef(false);

   const [analyseName, setAnalyseName] = useState("");
   const [analyseDescription, setAnalyseDescription] = useState("");
   const [analyseTags, setAnalyseTags] = useState([]);

   const [companyName, setCompanyName] = useState("");
   const [releaseDate, setReleaseDate] = useState("");
   const [companyAddress, setCompanyAddress] = useState("");
   const [deliveryTerms, setDeliveryTerms] = useState([]);
   const [paymentTerms, setPaymentTerms] = useState([]);
   const [termsConditions, setTermsConditions] = useState([]);
   const [scopeOfWork, setScopeOfWork] = useState([]);
   const [rasiedBy, setRasiedBy] = useState("");
   const [contact, setContact] = useState("");

   const [tagName, setTagName] = useState("");

   const setAnalyseDataState = useCallback(() => {
      if (analyseData) {
         setAnalyseName(analyseData.name);
         setAnalyseDescription(analyseData.description);
         setAnalyseTags(
            analyseData.tags
               ? analyseData.tags.map((tag) => {
                    return { id: uuidv4(), name: tag };
                 })
               : []
         );
      }
   }, [analyseData]);

   const setRequestForProposalDataState = useCallback(() => {
      if (requestForProposalData) {
         setCompanyName(requestForProposalData.companyName);
         setReleaseDate(requestForProposalData.releaseDate);
         setCompanyAddress(requestForProposalData.companyAddress);
         setDeliveryTerms(requestForProposalData?.deliveryTerms.join("\n"));
         setPaymentTerms(requestForProposalData?.paymentTerms.join("\n"));
         setTermsConditions(requestForProposalData?.termsConditions.join("\n"));
         setScopeOfWork(requestForProposalData.scopeOfWork);
         setRasiedBy(
            requestForProposalData.contactInformation
               ? requestForProposalData.contactInformation.raisedBy
               : ""
         );
         setContact(
            requestForProposalData.contactInformation
               ? requestForProposalData.contactInformation.contactDetail
               : ""
         );
      }
   }, [requestForProposalData]);

   const handleTagAdd = () => {
      if (analyseTags.length >= maxTags) {
         toast.error(`You can only add ${maxTags} tags !`);
         return;
      }

      if (tagName === "") return;

      if (analyseTags.find((tag) => tag.name === tagName)) {
         toast.error(`Tag ${tagName} already exists !`);
         return;
      }

      setAnalyseTags([...analyseTags, { id: uuidv4(), name: tagName }]);

      setTagName("");

      toast.info(`Tag ${tagName} added !`);
   };

   const handleTagRemove = (id) => {
      setAnalyseTags(analyseTags.filter((tag) => tag.id !== id));
   };

   const handleScopeOfWorkChange = (idx, key, value) => {
      let newScopeOfWork = [...scopeOfWork];
      newScopeOfWork[idx][key] = value;
      setScopeOfWork(newScopeOfWork);
   };

   const handleRestoreDefault = () => {
      setAnalyseDataState();
      setRequestForProposalDataState();
      toast.info("Default values restored !");
   };

   useEffect(() => {
      if (!useEffectRan.current) {
         useEffectRan.current = true;
         setAnalyseDataState();
         setRequestForProposalDataState();
      }
   }, [setAnalyseDataState, setRequestForProposalDataState]);

   useEffect(() => {
      handleAnalyseDataChange({
         name: analyseName,
         description: analyseDescription,
         tags: analyseTags.map((tag) => tag.name),
      });
   }, [analyseName, analyseDescription, analyseTags, handleAnalyseDataChange]);

   useEffect(() => {
      handleRequestForProposalDataChange({
         companyName: companyName,
         releaseDate: releaseDate,
         companyAddress: companyAddress,
         deliveryTerms:
            deliveryTerms.length > 0
               ? deliveryTerms.split("\n").filter((term) => term !== "")
               : requestForProposalData?.deliveryTerms,
         paymentTerms:
            paymentTerms.length > 0
               ? paymentTerms.split("\n").filter((term) => term !== "")
               : requestForProposalData?.paymentTerms,
         termsConditions:
            termsConditions.length > 0
               ? termsConditions.split("\n").filter((term) => term !== "")
               : requestForProposalData?.termsConditions,
         scopeOfWork: scopeOfWork,
         contactInformation: {
            raisedBy: rasiedBy,
            contactDetail: contact,
         },
      });
   }, [
      companyName,
      releaseDate,
      companyAddress,
      deliveryTerms,
      handleRequestForProposalDataChange,
      paymentTerms,
      requestForProposalData,
      scopeOfWork,
      termsConditions,
      rasiedBy,
      contact,
   ]);

   return (
      <div>
         <CardHeader>
            <div className='flex flex-row justify-between'>
               <div className='flex flex-col gap-2'>
                  <CardTitle>Step 2</CardTitle>
                  <CardDescription>
                     Check the details of the RFP document.
                  </CardDescription>
               </div>
               <div className='flex flex-col'>
                  <Button
                     size='sm'
                     variant='outline'
                     className='flex flex-row gap-2'
                     onClick={() => {
                        handleRestoreDefault();
                     }}
                  >
                     <Undo size={14} />
                     Restore Default
                  </Button>
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <div className='grid w-full items-center gap-1.5'>
               <form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0'>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        Analyse Information
                     </legend>
                     <div className='grid gap-3'>
                        <Label
                           className='flex flex-row gap-3 items-center'
                           htmlFor='analyse_name'
                        >
                           Name*
                           {analyseName === "" && (
                              <Badge variant='destructive'>
                                 No analyse name available
                              </Badge>
                           )}
                        </Label>
                        <Input
                           id='company_name'
                           placeholder='Enter analyse name'
                           value={analyseName}
                           onChange={(e) => {
                              setAnalyseName(e.target.value);
                           }}
                        />
                     </div>
                     <div className='grid gap-3'>
                        <Label
                           className='flex flex-row gap-3 items-center'
                           htmlFor='release_date'
                        >
                           Tags*
                           {analyseTags.length === 0 && (
                              <Badge variant='destructive'>
                                 No analyse tags available
                              </Badge>
                           )}
                        </Label>
                        <div className='flex flex-col'>
                           <div className='flex flex-row gap-2'>
                              {analyseTags.map((tag, idx) => (
                                 <Badge
                                    key={idx}
                                    variant='secondary'
                                    className='flex flex-row gap-2 mb-2'
                                 >
                                    {tag.name}
                                    <X
                                       size={14}
                                       onClick={() => handleTagRemove(tag.id)}
                                    />
                                 </Badge>
                              ))}
                           </div>
                           <div className='flex flex-row gap-2 items-center'>
                              <Input
                                 id='tag'
                                 placeholder='Enter tag'
                                 value={tagName}
                                 onChange={(e) => {
                                    setTagName(e.target.value);
                                 }}
                              />
                              <Button
                                 size='sm'
                                 type='button'
                                 className='flex flex-row gap-2'
                                 onClick={() => {
                                    handleTagAdd();
                                 }}
                              >
                                 <Plus size={14} />
                                 Add New Tag
                              </Button>
                           </div>
                        </div>
                     </div>
                     <div className='grid gap-3'>
                        <Label
                           className='flex flex-row gap-3 items-center'
                           htmlFor='analyse_description'
                        >
                           Description*
                           {analyseDescription === "" && (
                              <Badge variant='destructive'>
                                 No analyse description available
                              </Badge>
                           )}
                        </Label>
                        <Textarea
                           id='analyse_description'
                           placeholder='Enter analyse description'
                           value={analyseDescription}
                           onChange={(e) => {
                              setAnalyseDescription(e.target.value);
                           }}
                        />
                     </div>
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        RFP Basic Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-4/6'>
                           <Label
                              className='flex flex-row gap-3 items-center'
                              htmlFor='company_name'
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
                              className='flex flex-row gap-3 items-center'
                              htmlFor='release_date'
                           >
                              Release Date
                              {releaseDate === "" && (
                                 <Badge variant='destructive'>
                                    No release date available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='release_date'
                              placeholder='Enter release date'
                              value={releaseDate}
                              onChange={(e) => {
                                 setReleaseDate(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                     <div className='grid gap-3'>
                        <Label
                           className='flex flex-row gap-3 items-center'
                           htmlFor='company_address'
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
                     <div className='grid gap-3'>
                        <Label
                           className='flex flex-row gap-3 items-center'
                           htmlFor='terms_conditions'
                        >
                           Terms & Conditions
                           {termsConditions.length === 0 && (
                              <Badge variant='destructive'>
                                 No terms & conditions available
                              </Badge>
                           )}
                        </Label>
                        <Textarea
                           id='terms_conditions'
                           placeholder='Enter Terms & Conditions'
                           value={termsConditions}
                           onChange={(e) => {
                              setTermsConditions(e.target.value);
                           }}
                        />
                     </div>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-3/6'>
                           <Label
                              className='flex flex-row gap-3 items-center'
                              htmlFor='delivery_terms'
                           >
                              Delivery Terms
                              {deliveryTerms.length === 0 && (
                                 <Badge variant='destructive'>
                                    No delivery terms available
                                 </Badge>
                              )}
                           </Label>
                           <Textarea
                              id='delivery_terms'
                              placeholder='Enter delivery Terms'
                              value={deliveryTerms}
                              onChange={(e) => {
                                 setDeliveryTerms(e.target.value);
                              }}
                           />
                        </div>
                        <div className='grid gap-3 w-3/6'>
                           <Label
                              className='flex flex-row gap-3 items-center'
                              htmlFor='payment_terms'
                           >
                              Payment Terms
                              {paymentTerms.length === 0 && (
                                 <Badge variant='destructive'>
                                    No payment terms available
                                 </Badge>
                              )}
                           </Label>
                           <Textarea
                              id='payment_terms'
                              placeholder='Enter payment Terms'
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
                        Scope of Work Information
                     </legend>
                     {scopeOfWork &&
                        scopeOfWork.map((scope, idx) => (
                           <div key={idx} className='flex flex-row gap-3'>
                              <div className='grid gap-3 w-1/6'>
                                 <Label htmlFor='quantity'>Quantity*</Label>
                                 <Input
                                    id='quantity'
                                    placeholder='Enter quantity'
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
                              <div className='grid gap-3 w-5/6'>
                                 <Label htmlFor='description'>
                                    Description*
                                 </Label>
                                 <Input
                                    id='description'
                                    placeholder='Enter description'
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
                           </div>
                        ))}
                  </fieldset>
                  <fieldset className='grid gap-6 rounded-lg border p-4'>
                     <legend className='-ml-1 px-1 text-sm font-medium'>
                        RFP Contact Information
                     </legend>
                     <div className='flex flex-row gap-3'>
                        <div className='grid gap-3 w-3/6'>
                           <Label
                              className='flex flex-row gap-3 items-center'
                              htmlFor='rasied_by'
                           >
                              Rasied by
                              {rasiedBy === "" && (
                                 <Badge variant='destructive'>
                                    No rasied by available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='rasied_by'
                              placeholder='Enter rasied by'
                              value={rasiedBy}
                              onChange={(e) => {
                                 setRasiedBy(e.target.value);
                              }}
                           />
                        </div>
                        <div className='grid gap-3 w-3/6'>
                           <Label
                              className='flex flex-row gap-3 items-center'
                              htmlFor='contact'
                           >
                              Contact
                              {contact === "" && (
                                 <Badge variant='destructive'>
                                    No contact available
                                 </Badge>
                              )}
                           </Label>
                           <Input
                              id='contact'
                              placeholder='Enter contact'
                              value={contact}
                              onChange={(e) => {
                                 setContact(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                  </fieldset>
               </form>
            </div>
         </CardContent>
      </div>
   );
};

export default Step2Page;
