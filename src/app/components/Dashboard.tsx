"use client";
import React from "react";

import { redirect } from "next/navigation";

const Dashboard = (props: any) => {
  let authData: any = "";
  if (typeof window !== "undefined") {
    authData = localStorage.getItem("auth");
  }

  console.log("I am fis", localStorage);
  return (
    <>
      {typeof window !== "undefined" && JSON?.parse(authData)?.token
        ? redirect("/dataStreamConfigs")
        : redirect("/login")}
    </>
  );
};

export default Dashboard;
