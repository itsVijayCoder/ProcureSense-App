"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
   Plus,
   SquareArrowOutUpRight,
   Pencil,
   Trash2,
   Undo,
   Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Loader from "@/components/pages/loader";
import { Button } from "@/components/ui/button";
import { handleDateFormat } from "@/utils/function";
import {
   startAnalyse,
   deleteAnalyse,
   fetchAllAnalyse,
} from "@/utils/dashboard";
import { dashboardStore } from "@/stores/dashboard.js";
import { addAnalyseStore } from "@/stores/addAnalyse";
import { Input } from "@/components/ui/input";

const AnalysisPage = () => {
   const pageLimit = 5;
   const router = useRouter();
   const searchParams = useSearchParams();
   const { analyseList, totalAnalyse, selectedAnalyseId } = dashboardStore();
   const { setAnalyseList, setTotalAnalyse, setSelectedAnalyseId } =
      dashboardStore();
   const { setAnalyseId, setStage } = addAnalyseStore();

   const [isLoading, setIsLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [paginatedAnalyseList, setPaginatedAnalyseList] = useState([]);
   const [totalPages, setTotalPages] = useState(
      Math.ceil(totalAnalyse / pageLimit)
   );
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   const handlePaginatePrev = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const handlePaginateNext = () => {
      if (currentPage < Math.ceil(totalAnalyse / pageLimit))
         setCurrentPage(currentPage + 1);
   };

   const handleView = (id) => () => {
      setSelectedAnalyseId(id);
      return router.push(`/analysis/${id}`);
   };

   const handleEdit = (id, stage) => {
      setAnalyseId(id);
      setStage(stage);
      router.push(`/add-analysis`);
   };

   const handleRestart = async (id) => {
      try {
         await startAnalyse(id);
         toast.success(
            "Analysis restarted successfully ! Please wait for the analysis to complete."
         );
      } catch (error) {
         toast.error("Failed to restart analysis");
      }
   };

   const refreshAnalyseList = async () => {
      setIsLoading(true);
      try {
         const allAnalyse = await fetchAllAnalyse();
         setAnalyseList(allAnalyse.data);
         setSelectedAnalyseId(allAnalyse.data[0].id);
         setTotalAnalyse(allAnalyse.total);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
         setIsLoading(false);
      }
   };

   const handleDelete = async (id) => {
      try {
         await deleteAnalyse(id);
         toast.success("Analysis deleted successfully !");
         refreshAnalyseList();
         setIsDeleteModalOpen(false);
      } catch (error) {
         console.log(error);
         toast.error("Failed to delete analysis");
      }
   };

   const fetchBadgeColor = (status) => {
      switch (status) {
         case "completed":
            return "bg-green-700 hover:bg-green-700";
         case "failed":
            return "bg-destructive hover:bg-destructive";
         case "pending":
            return "bg-amber-600 hover:bg-amber-600";
         default:
            return "bg-primary hover:bg-primary";
      }
   };

   // useEffect(() => {
   //     const paginateAnalyse = () => {
   //         const startIndex = (currentPage - 1) * pageLimit;
   //         const endIndex = startIndex + pageLimit;
   //         setPaginatedAnalyseList(analyseList.slice(startIndex, endIndex));
   //     }
   //     paginateAnalyse()
   // }, [currentPage, analyseList]);

   useEffect(() => {
      const paginateAnalyse = () => {
         const filteredList = analyseList.filter(
            (analyse) =>
               analyse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               analyse.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
         );
         const startIndex = (currentPage - 1) * pageLimit;
         const endIndex = startIndex + pageLimit;
         setPaginatedAnalyseList(filteredList.slice(startIndex, endIndex));
         setTotalPages(Math.ceil(filteredList.length / pageLimit));
      };
      paginateAnalyse();
   }, [currentPage, analyseList, searchTerm]);

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
   };

   // Refetch data on component mount or when refresh parameter is present
   useEffect(() => {
      const shouldRefresh = searchParams.get("refresh") === "true";
      if (shouldRefresh || analyseList.length === 0) {
         refreshAnalyseList();
         // Remove the refresh parameter from URL after fetching
         if (shouldRefresh) {
            router.replace("/analysis");
         }
      }
   }, [searchParams]); // Only depend on searchParams to avoid infinite loops

   return (
      <>
         <div className='flex items-center justify-between'>
            <div className='inline-flex gap-4'>
               <h1 className='text-lg font-semibold md:text-2xl'>
                  All Analysis
               </h1>
               <div className='relative'>
                  <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                     className='pl-8'
                     placeholder='Search analyses...'
                     value={searchTerm}
                     onChange={handleSearch}
                  />
               </div>
            </div>
            <Button size='sm' className='flex flex-row gap-2'>
               <Plus size={12} absoluteStrokeWidth={1} />
               <Link href='/add-analysis'>Add Analysis</Link>
            </Button>
         </div>
         {isLoading ? (
            <Loader />
         ) : (
            <>
               {paginatedAnalyseList.length ? (
                  <div className='flex flex-1'>
                     <div className='flex flex-col gap-4 w-full'>
                        {paginatedAnalyseList.map((analyse, index) => (
                           <Card key={index} className='p-1'>
                              <CardHeader className='flex flex-row justify-between items-center p-2'>
                                 <CardTitle className='flex flex-col gap-2'>
                                    <div className='flex flex-row gap-6 items-center'>
                                       <span>{analyse.name}</span>
                                       <Badge
                                          className={
                                             "text-xs capitalize " +
                                             fetchBadgeColor(analyse.status)
                                          }
                                       >
                                          {analyse.status}
                                       </Badge>
                                    </div>
                                    <div className='flex flex-col gap-3 text-xs text-muted-foreground font-normal w-5/6'>
                                       <span>{analyse.description}</span>
                                       <span className='flex flex-row justify-between'>
                                          <span>
                                             Created At:{" "}
                                             {handleDateFormat(
                                                analyse.created_at
                                             )}
                                          </span>
                                          <span>
                                             Last Updated At:{" "}
                                             {handleDateFormat(
                                                analyse.updated_at
                                             )}
                                          </span>
                                       </span>
                                    </div>
                                 </CardTitle>
                                 <div className='flex flex-row gap-3'>
                                    {analyse.status === "pending" && (
                                       <Button
                                          size='sm'
                                          className='flex flex-row gap-2'
                                          variant='outline'
                                          onClick={() =>
                                             handleEdit(
                                                analyse.id,
                                                analyse.stage
                                             )
                                          }
                                       >
                                          <Pencil size={16} />
                                          <span>Edit</span>
                                       </Button>
                                    )}
                                    <Button
                                       size='sm'
                                       variant='destructive'
                                       className='flex flex-row gap-2'
                                       onClick={() => {
                                          setIsDeleteModalOpen(true);
                                       }}
                                    >
                                       <Trash2 size={16} />
                                       <span>Delete</span>
                                    </Button>
                                    <AlertDialog
                                       open={isDeleteModalOpen}
                                       onOpenChange={setIsDeleteModalOpen}
                                    >
                                       <AlertDialogContent>
                                          <AlertDialogHeader>
                                             <AlertDialogTitle>
                                                Are you absolutely sure?
                                             </AlertDialogTitle>
                                             <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your analyse and remove it from
                                                our servers.
                                             </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                             <AlertDialogCancel
                                                variant='outline'
                                                onClick={() => {
                                                   setIsDeleteModalOpen(
                                                      !isDeleteModalOpen
                                                   );
                                                }}
                                             >
                                                Cancel
                                             </AlertDialogCancel>
                                             <AlertDialogAction
                                                className='bg-destructive hover:bg-destructive'
                                                onClick={() => {
                                                   handleDelete(analyse.id);
                                                }}
                                             >
                                                Delete
                                             </AlertDialogAction>
                                          </AlertDialogFooter>
                                       </AlertDialogContent>
                                    </AlertDialog>
                                    {analyse.status !== "failed" &&
                                       analyse.status !== "pending" &&
                                       analyse.status !== "processing" && (
                                          <Button
                                             size='sm'
                                             className='flex flex-row gap-2'
                                             onClick={handleView(analyse.id)}
                                          >
                                             <SquareArrowOutUpRight size={16} />
                                             <span>View</span>
                                          </Button>
                                       )}
                                    {analyse.status === "failed" && (
                                       <Button
                                          size='sm'
                                          className='flex flex-row gap-2'
                                          onClick={() => {
                                             handleRestart(analyse.id);
                                          }}
                                       >
                                          <Undo size={16} />
                                          <span>Restart</span>
                                       </Button>
                                    )}
                                 </div>
                              </CardHeader>
                           </Card>
                        ))}
                     </div>
                  </div>
               ) : (
                  <div className='flex flex-1 items-center justify-center'>
                     <div className='flex flex-col items-center gap-1 text-center'>
                        <h3 className='text-2xl font-bold tracking-tight'>
                           You have no analysis
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                           You can start adding analysis to your dashboard to
                           get insights on your proposals.
                        </p>
                        <Button size='sm' className='flex flex-row gap-2'>
                           <Plus size={12} absoluteStrokeWidth={1} />
                           <Link href='/add-analysis'>Add Analysis</Link>
                        </Button>
                     </div>
                  </div>
               )}
               <Pagination>
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious
                           onClick={() => handlePaginatePrev()}
                           disabled={currentPage > 1}
                        />
                     </PaginationItem>
                     <PaginationItem>
                        <PaginationNext
                           onClick={() => handlePaginateNext()}
                           disabled={
                              currentPage < Math.ceil(totalAnalyse / pageLimit)
                           }
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
               <div className='flex flex-row justify-center gap-6 text-sm font-medium'>
                  <div>
                     Page <span className='font-bold'>{currentPage}</span> of{" "}
                     <span className='font-bold'>{totalPages}</span>
                  </div>
                  <div>
                     Total Pages:{" "}
                     <span className='font-bold'>{totalPages}</span>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default AnalysisPage;
