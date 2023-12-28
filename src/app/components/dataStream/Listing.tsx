"use client";
import React from "react";
import moment from "moment";

import { MdDownload } from "react-icons/md";

const Lisitng = ({ data }: any) => {

  const columns = [
    "Config Name",
    "Account Name",
    "Source",
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
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Data Stream Listing</h1>
      </div>

      <div className="overflow-x-auto w-[100%] border-solid mt-4">
        <table className=" border-collapse  mt-8 w-[100%]">
          <thead>
            <tr>
              {columns.map((column: any, index: any) => (
                <th
                  className={`${
                    column === "Config Name" ||
                    column === "Source" ||
                    column === "Status" ||
                    column === "Selected Days" ||
                    column === "Duration" ||
                    column === "Created On" ||
                    column === "Actions"
                      ? "w-[200px]"
                      : "w-[500px]"
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
                    <td className="w-[200px] pl-8 border-l-[1px] border-l-shinyGray">
                      {row?.name}
                    </td>
                    <td className="w-[300px] pl-8">
                      {row?.account?.label}
                    </td>
                    <td className="w-[200px] pl-8">
                      {row?.source ? row?.source : "-"}
                    </td>
                    <td className="w-[200px] pl-8">
                      {row?.status === "Successful" ? (
                        <div
                          className="border-[1px] border-successGreen text-successGreen p-1 rounded"
                          style={{
                            padding: "6px",
                            // backgroundColor: "#ABE098",
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
                    <td className="w-[300px] pl-8">{row?.message}</td>
                    <td className="w-[200px] pl-8">
                      {row?.configDays?.label}
                    </td>
                    <td className="w-[200px] pl-8">
                      {row?.selectedDays.length > 0
                        ? selectedDay.toString()
                        : "-"}
                    </td>
                    <td className="w-[200px] pl-8">
                      {moment(row?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="w-[200px] pl-8 border-r-2 border-r-shinyGray">
                      <button
                        onClick={handleDownload(row?.filePath)}
                        className={`bg-secondary text-white font-semibold hover:text-secondary hover:bg-white border hover:border-secondary rounded py-2 px-4  ${
                          row?.filePath === "NA"
                            ? " opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <MdDownload />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="p-8 text-center border-b-[1px] border-b-lightGray border-l-[1px] border-l-lightGray border-r-[1px] border-r-lightGray"
                  colSpan={9}
                >
                  No Data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lisitng;
