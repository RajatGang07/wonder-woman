"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { facebookConfigAsync } from "../../redux/reducers/saveFacebookConfig";

import Table from "./LisitngPreview";
import { DOMAIN_URL } from "../../services";

export default function ShowPreview() {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedKeys = useSelector(
    (state: any) => state?.storeFacebookInfoReducer?.selectedKeys
  );

  const [csvTable, setCSVTable] = useState([]);
  const [loader, setLoader] = useState(false);
  const handleGenerateCsv = async () => {
    try{
      setLoader(true)
      const creativeLevelResponse = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/generate/csv`,
        selectedKeys
      );
      setCSVTable(creativeLevelResponse?.data?.response);
  
    } catch (err: any) {
      console.log(err)
    }
    finally{
      setLoader(false)
    }
   
  
  };

  useEffect(() => {
    if (selectedKeys) {
      handleGenerateCsv();
    }
  }, [JSON.stringify(selectedKeys)]);

  const handleSetDataAndMoveToNext = async () => {
    await dispatch(facebookConfigAsync(selectedKeys)).then(() => {
      router.push("/dataStreamConfigs");
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

      {loader  ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
            <svg
              fill="none"
              className="w-6 h-6 animate-spin"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
            <div>Loading ...</div>
          </div>
        </div>
      ) : (
        <Table data={csvTable} />
      )}
    </div>
  );
}
