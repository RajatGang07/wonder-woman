"use client";
import React from "react";
import { useSelector } from "react-redux";

import { redirect } from "next/navigation";

const Dashboard = (props: any) => {

  const userId =
  useSelector(
    (state: any) => state?.auth?.user?.userId
  ) || [];

  console.log("I am fis");
  return (
    <>
      {userId
        ? redirect("/dataStreamConfigs")
        : redirect("/login")}
    </>
  );
};

export default Dashboard;
