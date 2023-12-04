"use client";
import React from "react";

import NavBar from "./navbar/navbar";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import TabsComponent from "./components/Tabs";

const Dashboard = ({ children }: any) => {
  const authData: any = localStorage.getItem("auth");

  return (
    <>
      {JSON.parse(authData)?.token ? (
        <>
          <NavBar />
          <Sidebar />
          <TabsComponent />
        </>
      ) : (
        redirect("/login")
      )}
    </>
  );
};

export default Dashboard;
