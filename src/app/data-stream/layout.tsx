import React from "react";
import NavBar from "../navbar/navbar";
import Sidebar from "../components/Sidebar";
import TabsComponent from "../components/Tabs";

const DataStream = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      <div className="flex gap-12">
        <div className="w-[15%] h-[90vh]">
          <Sidebar />
        </div>
        <div className="w-[80%] mt-8">
          <TabsComponent />
          {children}
        </div>

        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default DataStream;