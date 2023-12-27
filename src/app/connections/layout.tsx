import React from "react";
import NavBar from "../components/navbar/navbar";
import Sidebar from "../components/Sidebar";
import TabsComponent from "../components/Tabs";

const DataStream = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      <div className="flex gap-12">
        <div className="w-[15%] h-[100vh]">
          <Sidebar />
        </div>
        <div className="w-[80%] mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DataStream;
