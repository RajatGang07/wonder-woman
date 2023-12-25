"use client";
import React from "react";

const Table = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto w-[100%] border-solid border-2 border-secondary">
      <table className=" border-collapse  mt-8">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th className="min-w-[300px] text-start pl-8" key={index}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: any) => (
            <tr className="border-b-2 border-indigo-200 border-b-[#173969]" key={rowIndex}>
              {columns.map((column: any, colIndex: any) => (
                <td className="min-w-[300px] pl-8" key={colIndex}>
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
