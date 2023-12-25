"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";

import Table from "./Listing";

export default function MonitorPipeline(props: any) {
  const [csvTable, setCSVTable] = useState([]);

  const backendURL = "http://localhost:8080";

  const handleFetchLogs = async () => {
    const userData: any = localStorage.getItem("auth");
    const creativeLevelResponse = await axios.post(
      `${backendURL}/api/v1/get/log`,
      { userId: JSON?.parse(userData)?.userId }
    );

    setCSVTable(creativeLevelResponse?.data?.data);
    console.log("creativeLevelResponse", creativeLevelResponse);
  };

  useEffect(() => {
    handleFetchLogs();
  }, []);

  return (
    <div className="flex justify-between flex-col pb-8 gap-4">
      <Table data={csvTable} />
    </div>
  );
}
