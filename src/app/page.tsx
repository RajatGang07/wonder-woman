"use client";
import React, { useEffect, useState } from "react";

import NavBar from "./navbar/navbar";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import TabsComponent from "./components/Tabs";

const Dashboard = ({ children }: any) => {
  let authData: any = {};
  if (typeof window !== "undefined") {
    authData = localStorage.getItem("auth");
  }

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
