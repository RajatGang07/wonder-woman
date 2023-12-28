"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { facebookConfigAsync } from "../../redux/reducers/saveFacebookConfig";

import Table from "./LisitngPreview";

export default function ShowPreview() {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleSetDataAndMoveToNext = async () => {
    await dispatch(facebookConfigAsync(selectedKeys)).then(() => {
      router.push('/dataStreamConfigs');
    });
  };

  return (
    <div className="flex justify-between flex-col pb-8 gap-4">
        <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Preview</h1>
        <button
          onClick={handleSetDataAndMoveToNext}
          className={`bg-secondary  text-white font-semibold  py-2 px-4 border border-secondary hover:border-secondary hover:bg-white rounded hover:text-secondary`}
        >
          Publish Data Stream
        </button>
      </div>
      <Table data={csvTable} />
    </div>
  );
}
