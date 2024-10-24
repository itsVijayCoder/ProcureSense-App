import React from "react";
import { OverallDashboardComponent } from "@/components/pages/dashboard/overall-dashboard";
import { DashboardLayout } from "@/components/pages/dashboard/dashboard";

const HomePage = () => {
   return (
      <div>
         <OverallDashboardComponent />
         {/* <DashboardLayout /> */}
      </div>
   );
};

export default HomePage;
