"use client";
import React from "react";
import moment from "moment";

import { MdDownload } from "react-icons/md";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import styles from "./list.module.css";

const Lisitng = ({ data }: any) => {

  const columns = [
    "Config Name",
    "Account Name",
    "Source",
    "Status",
    "Message",
    "Duration",
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

      <div className="w-[100%] border-solid mt-4">
        <table className=" border-collapse   mt-8 w-[100%]">
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
                    className="border-b-[1px] text-lightBlack border-b-lightGray hover:bg-slate-50 "
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
                            width: "100px",
                            borderRadius: "4px",
                          }}
                        >
                          {row?.status}
                        </div>
                      ) : (
                        <div
                        className="border-[1px] border-errorRed text-errorRed p-1 rounded w-[100px]"
                          style={{
                            padding: "8px",
                            width: "120px",
                            borderRadius: "4px",
                          }}
                        >
                          {row?.status}
                        </div>
                      )}
                    </td>
                    <td className="w-[300px] pl-8">{row?.message}</td>
                    <td className="w-[200px] pl-8">
                    <div className="inline-flex gap-4 ">
                      {row?.configDays?.label}
                      {row?.configDays?.label !== "Months" && (
                        <div className={styles.tooltip}>
                          <InfoIcon />
                          <span className={styles.tooltiptext}>
                            {selectedDay?.map((item: any) => {return <div>{item}</div>})}
                          </span>
                        </div>
                      )}
                      </div>
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
