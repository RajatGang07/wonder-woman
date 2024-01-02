"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";

import Table from "./Listing";
import { DOMAIN_URL } from "../../services";

export default function DataStreamPage(props: any) {
  const [csvTable, setCSVTable] = useState([]);


  const handleFetchLogs = async () => {
    const userData: any = localStorage.getItem("auth");
    const creativeLevelResponse = await axios.post(
      `${DOMAIN_URL.prod}/api/v1/get/log`,
      { userId: JSON?.parse(userData)?.userId }
    );

    setCSVTable(creativeLevelResponse?.data?.data);
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
