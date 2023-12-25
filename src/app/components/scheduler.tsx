"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import axios from "axios";

import Table from "./Table";

export default function SelectAttribute(props: any) {
  const router = useRouter();

  const selectedKeys = useSelector(
    (state: any) => state?.storeFacebookInfoReducer?.selectedKeys
  );

  const [csvTable, setCSVTable] = useState([]);
  const [schedule, setSchedule] = useState([
    {
      label: "Daily",
      value: "Daily",
    },
    {
      label: "Weekly",
      value: "Weekly",
    },
    {
      label: "Manual",
      value: "Manual",
    },
  ]);

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
      <label>Accounts</label>
      <Select
        defaultValue={schedule[0]}
        // onChange={onHandleAccountsChange}
        options={schedule}
      />

      <div className="flex justify-end gap-8">
        <button
          onClick={handleGenerateCsv}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Preview CSV
        </button>
        <div className="inline-flex">
          <button
            onClick={() => router.push("/selectAttributes")}
            className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
        </div>
      </div>

      <Table data={csvTable} />
    </div>
  );
}
