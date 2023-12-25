"use client";
import React from "react";

import NavBar from "./components/navbar/navbar";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import TabsComponent from "./components/Tabs";

const Dashboard = (props: any) => {
  let authData: any = '';
  if (typeof window !== "undefined") {
    authData = localStorage.getItem("auth");
  }

  console.log(props)
  return (
    <>
      {typeof window !== "undefined" && JSON?.parse(authData)?.token ? (
        <>
          {/* <NavBar /> */}
          {/* <Sidebar /> */}
          {/* <TabsComponent /> */}
        </>
      ) : (
        redirect("/login")
      )}
    </>
  );
};

export default Dashboard;
