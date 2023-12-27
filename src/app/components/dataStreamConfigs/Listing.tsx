"use client";
import React from "react";

const Lisitng = ({ data, handleDelete }: any) => {
 
  const columns = [
    "Config Name",
    "Account Name",
    "Source",
    "Duration",
    "Actions",
  ];

  const handleDownload = (path: any) => () => {
    if (path === "NA") return;
    window.open(path);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Data Stream Configuration</h1>
        <button
          // onClick={handleNavigate("/create-data-stream/source")}
          className={`bg-secondary  text-white font-semibold  py-2 px-4 border border-secondary hover:border-secondary hover:bg-white rounded hover:text-secondary`}
        >
          Run All Data Stream
        </button>
      </div>
      <table className=" border-collapse  mt-8">
        <thead>
          <tr>
            {columns.map((column: any, index: any) => (
              <th
                className={`${
                  column === "Config Name" ||
                  column === "Source" ||
                  column === "Duration" ||
                  column === "Actions"
                    ? "min-w-[200px]"
                    : "min-w-[500px]"
                } text-shinyBlack text-start p-[12px] border-2  border-shinyGray h-[100%] w-max`}
                key={index}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row: any, rowIndex: any) => {
              const selectedDay: any = [];
              row?.selectedDays.map((item: any) =>
                selectedDay.push(item.label)
              );
              return (
                <tr
                  className="border-b-[1px] text-lightBlack border-b-lightGray"
                  key={rowIndex}
                >
                  <td className="min-w-[200px] p-[12px] border-l-[1px] border-l-shinyGray">
                    {row?.configName}
                  </td>
                  <td className="min-w-[300px] p-[12px]">
                    {row?.account?.label}
                  </td>
                  <td className="min-w-[200px] p-[12px]">{row?.source}</td>
                  <td className="min-w-[200px] p-[12px]">
                    {row?.configDays?.label}
                  </td>
                  <td className="min-w-[200px] p-[12px] border-r-[1px] border-r-shinyGray">
                    <div className="flex gap-4">
                      <button
                        onClick={handleDownload(row?.filePath)}
                        className="border-[1px] border-successGreen text-successGreen p-1 rounded w-[100px]"
                      >
                        Run
                      </button>
                      <button
                        onClick={handleDelete(row?.id)}
                        className="border-[1px] border-errorRed text-errorRed p-1 rounded w-[100px]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                className="p-8 text-center border-b-[1px] border-b-lightGray border-l-[1px] border-l-lightGray border-r-[1px] border-r-lightGray"
                colSpan={5}
              >
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Lisitng;
