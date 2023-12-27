"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import axios from "axios";

import Table from "./Table";

export default function ShowPreview(props: any) {
  const router = useRouter();

  const selectedKeys = useSelector(
    (state: any) => state?.storeFacebookInfoReducer?.selectedKeys
  );

  const [csvTable, setCSVTable] = useState([]);

  const backendURL = "http://localhost:8080";

  const handleGenerateCsv = async () => {
    const userData: any = localStorage.getItem("auth");
    const creativeLevelResponse = await axios.post(
      `${backendURL}/api/v1/generate/csv`,
      { userId: JSON?.parse(userData)?.userId }
    );

    setCSVTable(creativeLevelResponse?.data?.response);
    console.log("creativeLevelResponse", creativeLevelResponse);
  };

  useEffect(() => {
    if (selectedKeys) {
      handleGenerateCsv();
    }
  }, [selectedKeys]);

  return (
    <div className="flex justify-between flex-col pb-8 gap-4">
      <Table data={csvTable} />
    </div>
  );
}
