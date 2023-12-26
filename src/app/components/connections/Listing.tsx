"use client";
import React from "react";

const Lisitng = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = [
    "Config Name",
    "Account Name",
    "Duration",
    // "Selected Days",
    "Upload CSV",
    "Disconnect A/C"
  ];

  const handleDownload = (path: any) => () => {
    if (path === "NA") return;
    window.open(path);
  };
  return (
    <div>
      <h1>Connection Table</h1>
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
            {data.map((row: any, rowIndex: any) => {
              const selectedDay: any = [];
              row?.selectedDays.map((item: any) =>
                selectedDay.push(item.label)
              );
              return (
                <tr className="border-b-2  border-b-[#173969]" key={rowIndex}>
                  <td className="min-w-[300px] pl-8">{row?.configName}</td>
                  <td className="min-w-[300px] pl-8">{row?.account?.label}</td>
                  <td className="min-w-[300px] pl-8">
                    {row?.configDays?.label}
                  </td>
                  {/* <td className="min-w-[300px] pl-8">
                    {row?.selectedDays.length > 0
                      ? selectedDay.toString()
                      : "-"}
                  </td> */}
                  <td className="min-w-[300px] pl-8">
                    <button
                      onClick={handleDownload(row?.filePath)}
                      className={`bg-transparent  font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent`}
                      style={{color: "#ABE098", borderColor: "#ABE098"}}
                    >
                      Run
                    </button>
                  </td>
                  <td className="min-w-[300px] pl-8">
                    <button
                      onClick={handleDownload(row?.filePath)}
                      className={`bg-transparent  font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent`}
                      style={{borderColor: "#ff0000", color: '#ff0000'}}
                    >
                      Disconnect
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lisitng;
