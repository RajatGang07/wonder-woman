"use client";
import React from "react";

const Lisitng = ({ data, handleDisconnect }: any) => {
  const columns = ["Name", "Email", "Associated Accounts", "Actions"];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Connections</h1>
      </div>
      <table className=" border-collapse  mt-8 w-[100%]">
        <thead>
          <tr>
            {columns.map((column: any, index: any) => (
              <th
                className={`${
                  column === "Name" ||
                  column === "Email" ||
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
              row?.accountList.map((item: any) =>
                selectedDay.push(`${item.name}_${item?.id}`)
              );
              return (
                <tr
                  className="border-b-[1px] text-lightBlack border-b-lightGray hover:bg-slate-50 "
                  key={rowIndex}
                >
                  <td className="w-[200px] p-[12px] border-l-[1px] border-l-shinyGray">
                    {row?.name}
                  </td>
                  <td className="w-[200px] p-[12px]">{row?.email}</td>
                  <td className="w-[500px] p-[12px]">
                    {selectedDay?.length > 0 ? selectedDay.toString() : "-"}
                  </td>

                  <td className="w-[200px] p-[12px] border-r-[1px] border-r-shinyGray">
                    <div className="flex gap-4">
                      <button
                        onClick={handleDisconnect(row?.id)}
                        className="border-[1px] border-errorRed text-errorRed p-1 rounded w-[100px]"
                      >
                        Disconnect
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
                colSpan={4}
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
