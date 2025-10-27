"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
   Home,
   LineChart,
   Menu,
   Plus,
   LogOut,
   Settings,
   ChevronsRight,
   ChevronsLeft,
   ChevronLeft,
   ChevronRight,
   PlusCircle,
   Clock4,
   LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Loader from "@/components/pages/loader";
import { AuthWrapper, Logout } from "@/utils/auth";
import { dashboardStore } from "@/stores/dashboard.js";
import { fetchAllAnalyse } from "@/utils/dashboard";
import { useEffect, useRef, useState } from "react";

const DashboardLayout = ({ children }) => {
   const pathname = usePathname();
   const router = useRouter();
   const useEffectRan = useRef(false);

   const { setAnalyseList, setTotalAnalyse, setSelectedAnalyseId } =
      dashboardStore();
   const [isLoading, setIsLoading] = useState(true);
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   const handleLogout = async () => {
      try {
         await Logout();
         router.push("/login");
         return;
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         const allAnalyse = await fetchAllAnalyse();
         setAnalyseList(allAnalyse.data);
         if (allAnalyse.data.length > 0) {
            const filteredAnalyseList = allAnalyse.data.filter(
               (analyse) => analyse.status === "completed"
            );
            if (filteredAnalyseList.length > 0) {
               setSelectedAnalyseId(filteredAnalyseList[0].id);
            }
         }
         setTotalAnalyse(allAnalyse.total);
         setIsLoading(false);
      };

      if (!useEffectRan.current) {
         useEffectRan.current = true;
         fetchData();
      }
   }, []);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const navData = [
      {
         name: "Dashboard",
         href: "/home",
         icon: LayoutTemplate,
      },
      {
         name: "All Analyse",
         href: "/analysis",
         icon: LineChart,
      },
      {
         name: "Recent Analysis",
         href: "/recent-analysis",
         icon: Clock4,
      },
      {
         name: "Recently Added",
         href: "/recently-added",
         icon: PlusCircle,
      },
   ];

   return (
      <div className='grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]'>
         <div
            className={`hidden border-r md:block z-20 ${
               isSidebarOpen ? "w-[12.5rem]" : "w-[5rem]"
            } transition-all duration-300`}
         >
            <div className='sticky top-0 flex h-full max-h-screen flex-col gap-2 '>
               <div className='flex h-14 items-center gap-5 border-b px-4 lg:h-[60px] lg:px-6  justify-between relative'>
                  <Link
                     href='/home'
                     className='flex items-center gap-2 font-semibold'
                  >
                     <ChevronsRight
                        absoluteStrokeWidth={3}
                        size={16}
                        className='h-6 w-6 text-primary'
                     />
                     {isSidebarOpen && (
                        <span className='text-primary w-full flex-1'>
                           Procure Sense
                        </span>
                     )}
                  </Link>
                  <Button
                     variant='ghost'
                     size='icon'
                     onClick={toggleSidebar}
                     className='absolute -right-4 z-50 top-20 border  ml-1 rounded-full hover:text-primary'
                  >
                     {isSidebarOpen ? (
                        <ChevronLeft className='size-5 ' />
                     ) : (
                        <ChevronRight className='size-5  ' />
                     )}
                  </Button>
               </div>
               <div className='flex-1'>
                  <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                     {navData.map((item) => (
                        <Link
                           key={item.name}
                           href={item.href}
                           className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                              pathname === item.href ? "text-primary" : ""
                           }`}
                        >
                           <item.icon className='size-6' />
                           {isSidebarOpen && item.name}
                        </Link>
                     ))}
                     {/* <Link
                        href='/home'
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                           pathname === "/home" ? "text-primary" : ""
                        }`}
                     >
                        <DashboardIcon className='size-6' />
                        {isSidebarOpen && "Dashboard"}
                     </Link>
                     <Link
                        href='/analysis'
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                           pathname === "/analysis" ? "text-primary" : ""
                        }`}
                     >
                        <Clock4 className='size-6' />
                        {isSidebarOpen && "Analysis"}
                     </Link> */}
                  </nav>
               </div>
               {isSidebarOpen ? (
                  <div className='mt-auto p-2'>
                     <Card>
                        <CardHeader className='p-2 pt-0 md:p-4'>
                           <CardTitle className='text-sm'>
                              Add Analysis
                           </CardTitle>
                           <CardDescription className='text-xs'>
                              Add Analysis to your dashboard to get insights on
                              your proposals.
                           </CardDescription>
                        </CardHeader>
                        <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
                           <Button
                              size='sm'
                              className='flex flex-row gap-2 w-full'
                           >
                              <Plus size={12} absoluteStrokeWidth={1} />
                              <Link href='/add-analysis'>Add Analysis</Link>
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               ) : (
                  <div className='flex items-center justify-center pb-5'>
                     <Link
                        href='/add-analysis'
                        size='sm'
                        className='inline-flex p-3 size-10 bg-primary hover:bg-primary/90 justify-center items-center text-white  rounded-full'
                     >
                        <Plus size={18} absoluteStrokeWidth={3} />
                        {/* <Link href='/add-analysis'>Add Analysis</Link> */}
                     </Link>
                  </div>
               )}
            </div>
         </div>
         <div className='flex flex-col'>
            <header className='sticky top-0 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-white z-10'>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        variant='outline'
                        size='icon'
                        className='shrink-0 md:hidden'
                     >
                        <Menu className='h-5 w-5' />
                        <span className='sr-only'>Toggle navigation menu</span>
                     </Button>
                  </SheetTrigger>
                  <SheetContent side='left' className='flex flex-col'>
                     <nav className='grid gap-2 text-lg font-medium'>
                        <Link
                           href='/home'
                           className='flex items-center gap-2 text-lg font-semibold mb-3'
                        >
                           <ChevronsRight
                              absoluteStrokeWidth={3}
                              size={16}
                              className='h-6 w-6'
                           />
                           <span className=''>Procure Sense</span>
                        </Link>
                        <Link
                           href='/home'
                           className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                              pathname === "/home" ? "text-primary" : ""
                           }`}
                        >
                           <Home className='size-6' />
                           Home
                        </Link>
                        <Link
                           href='/analysis'
                           className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                              pathname === "/analysis" ? "text-primary" : ""
                           }`}
                        >
                           <LineChart className='size-6' />
                           Analysis
                        </Link>
                     </nav>
                     <div className='mt-auto'>
                        <Card>
                           <CardHeader className='p-4'>
                              <CardTitle className='text-sm'>
                                 Add Analysis
                              </CardTitle>
                              <CardDescription className='text-xs'>
                                 Add Analysis to your dashboard to get insights
                                 on your proposals.
                              </CardDescription>
                           </CardHeader>
                           <CardContent className='p-4'>
                              <Button
                                 size='sm'
                                 className='flex flex-row gap-2 w-full'
                              >
                                 <Plus size={12} absoluteStrokeWidth={1} />
                                 <Link href='/add-analysis'>Add Analysis</Link>
                              </Button>
                           </CardContent>
                        </Card>
                     </div>
                  </SheetContent>
               </Sheet>
               <div className='w-full flex-1'></div>
               {/* Brand logo */}
               {/* <div className='hidden md:flex items-center'>
                  <Image
                     src='/images/redaa-logo.png'
                     alt='Redaa logo'
                     width={120}
                     height={28}
                     className='h-10 w-auto'
                     priority
                  />
               </div> */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     {/* <Avatar>
                        <AvatarImage src='https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Toby&backgroundColor=ecad80' />
                        <AvatarFallback>SX</AvatarFallback>
                     </Avatar> */}
                     <div className='hidden md:flex items-center'>
                        <Image
                           src='/images/redaa-logo.png'
                           alt='Redaa logo'
                           width={120}
                           height={28}
                           className='h-12 w-auto'
                           priority
                        />
                     </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                     <DropdownMenuItem>
                        <div className='flex flex-row gap-3 hover:text-primary items-center'>
                           <Settings size={14} />
                           <span>Settings</span>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <div
                           className='flex flex-row gap-3 hover:text-primary items-center'
                           onClick={() => {
                              handleLogout();
                           }}
                        >
                           <LogOut size={14} />
                           <span>Logout</span>
                        </div>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </header>
            <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-[80%] bg-muted/40'>
               {isLoading ? <Loader /> : children}
            </main>
         </div>
      </div>
   );
};

export default AuthWrapper(DashboardLayout);
