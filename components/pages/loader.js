"use client";

const Loader = () => {
   return (
      <div className='flex h-full min-h-[30vh] flex-col items-center justify-center gap-4 text-center text-muted-foreground/80'>
         <div className='loader scale-in' aria-hidden='true' />
         <div className='space-y-1'>
            <p className='text-sm font-medium tracking-wide text-foreground/80'>
               Preparing your insights
            </p>
            <p className='text-xs'>
               This won&apos;t take long. We&apos;re orchestrating the latest
               data.
            </p>
         </div>
      </div>
   );
};

export default Loader;
