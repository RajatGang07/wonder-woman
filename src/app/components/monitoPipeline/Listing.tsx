"use client";
import React from "react";
import moment from "moment";

const Lisitng = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = [
    "Config Name",
    "Account Name",
    "Status",
    "Message",
    "Duration",
    "Selected Days",
    "Created On",
    "Actions",
  ];

  const handleDownload = (path: any) => () => {
    if (path === "NA") return;
    window.open(path);
  };
  return (
    <div>
        <h1>Log Table</h1>
    <div className="overflow-x-auto w-[100%] border-solid border-2 border-secondary mt-12">
      <table className=" border-collapse  mt-8">
        <thead>
          <tr>
            {columns.map((column: any, index: any) => (
              <th className="min-w-[300px] text-start pl-8" key={index}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: any) => (
            <tr className="border-b-2  border-b-[#173969]" key={rowIndex}>
              <td className="min-w-[300px] pl-8">{row?.name}</td>
              <td className="min-w-[300px] pl-8">{row?.account?.label}</td>
              <td className="min-w-[300px] pl-8">
                {row?.status === "Successful" ? (
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: "#ABE098",
                      width: "100px",
                      borderRadius: "4px",
                    }}
                  >
                    {row?.status}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: "#ff0000",
                      width: "100px",
                      borderRadius: "4px",
                    }}
                  >
                    {row?.status}
                  </div>
                )}
              </td>
              <td className="min-w-[300px] pl-8">{row?.message}</td>
              <td className="min-w-[300px] pl-8">{row?.configDays?.label}</td>
              <td className="min-w-[300px] pl-8">
                {row?.selectedDays.map((item: any) => item.label)}
              </td>
              <td className="min-w-[300px] pl-8">
                {moment(row?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td className="min-w-[300px] pl-8">
                <button
                  onClick={handleDownload(row?.filePath)}
                  className={`bg-transparent  hover:bg-secondary text-secondary font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent rounded ${
                    row?.filePath === "NA"
                      ? " opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Download CSV
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Lisitng;
