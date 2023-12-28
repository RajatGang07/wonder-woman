"use client";
import React from "react";

const LisitngPreview = ({ data }: any) => {
  if (!data || data.length === 0) {
    return;
  }
  const columns = Object.keys(data[0]);
  return (
    <div className="overflow-x-auto w-[100%]">
      <table className=" border-collapse  mt-8 w-[100%] border-[1px] border-lightGray">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                className="min-w-[300px] text-shinyBlack text-start p-[12px] border-2  border-shinyGray h-[100%] w-max"
                key={index}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row: any, rowIndex: any) => (
              <tr
                className="border-b-[1px] text-lightBlack border-b-lightGray"
                key={rowIndex}
              >
                {columns.map((column: any, colIndex: any) => (
                  <td className="min-w-[300px] pl-8" key={colIndex}>
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="p-8 text-center border-b-[1px] border-b-lightGray border-l-[1px] border-l-lightGray border-r-[1px] border-r-lightGray"
                colSpan={51}
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

export default LisitngPreview;
