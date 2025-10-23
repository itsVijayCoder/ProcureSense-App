"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useScrollWithOffset(offset = 0) {
   const router = useRouter();
   const pathname = usePathname();

   const scrollToElement = useCallback(
      (elementId) => {
         // Get the current page path and append the hash
         const currentPath = pathname;
         router.push(`${currentPath}#${elementId}`);

         setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
               const y =
                  element.getBoundingClientRect().top +
                  window.pageYOffset -
                  offset;
               window.scrollTo({ top: y, behavior: "smooth" });
            }
         }, 100);
      },
      [router, pathname, offset]
   );

   return scrollToElement;
}
