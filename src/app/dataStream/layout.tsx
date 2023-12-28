import React from "react";
import NavBar from "../components/navbar/navbar";
import Sidebar from "../components/Sidebar";

const MonitorPipeline = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      <div className="flex gap-12">
        <div className="w-[15%] h-[100vh] sticky top-0">
          <Sidebar />
        </div>
        <div className="w-[80%] mt-8">
          {children}
        </div>

        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default MonitorPipeline;
