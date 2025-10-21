import React from "react";
import { Outlet } from "react-router";

import Sidebar from "../shared/Sidebar";
import DashboardHeader from "../shared/DashboardHeader";

const DashboardLayout: React.FC = () => {
  return (
    <div className="d-flex h-screen overflow-hidden">
      <div className="d-none d-md-block d-lg-block">
        <Sidebar />
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto overflow-x-hidden">
        <DashboardHeader />
        
        <main className="p-4 p-sm-5 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
