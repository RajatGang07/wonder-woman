"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN_URL } from "../../services";

export default function DataSource() {
  const [reportList, setReportList] = useState([]);

  const handleFetchLogs = async () => {
    const userData: any = localStorage.getItem("auth");
    const creativeLevelResponse = await axios.post(
      `${DOMAIN_URL.prod}/api/v1/report`,
      { userId: JSON?.parse(userData)?.userId }
    );
    setReportList(creativeLevelResponse?.data?.facebookConfig);
  };

  useEffect(() => {
    handleFetchLogs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Performance Reports</h1>
      </div>
      <div className="flex pb-8 gap-8">
        {reportList?.map((item: any) => {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg min-w-[200px]">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item?.name}</div>
                <button
                  onClick={() => window.open(item?.url)}
                  className={`bg-transparent  hover:bg-secondary text-secondary font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent rounded ${
                    item?.url === "" ? " opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
