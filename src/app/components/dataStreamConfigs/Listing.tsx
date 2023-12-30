"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Loader } from "../../assets/icons/Loader";
import { columns } from "./constant";
import { InfoIcon } from "../../assets/icons/InfoIcon";

import styles from "./list.module.css";
import { setSelectedKeysInfo } from "../../redux/reducers/storeFacebookInfo";

const Lisitng = ({
  data,
  handleDelete,
  runSingleConfig,
  loading,
  selectedIndex,
  handleEdit,
  handleView
}: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigate = (route: any) => async () => {
    await dispatch(
      setSelectedKeysInfo({
        id: "",
        selectedDataSource: "",
        configName: "",
        account: "",
        campaign: [],
        userId: "",
        selectedAdInsights: [],
        selectedCampaignInsights: [],
        selectedAdSetInsights: [],
        selectedAccountLevel: [],
        selectedCreativeLevel: [],
        selectedAdSetLevel: [],
        selectedAdSetFields: [],
        configDays: {
          label: "Months",
          value: "Months",
        },
        selectedDays: [],
        cron: "0 0 28-31 * *",
        selectedFacebookUser: {},
        datePreset: {},
        breakdowns: [],
        timeIncrement: {},
        isView: false,
        isEdit: false,
      })
    );
    router.push(route);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Data Stream Configuration</h1>
        <button
          onClick={handleNavigate("/create-data-stream/source")}
          className={`bg-secondary   text-white font-semibold inline-flex  py-2 px-4 border border-secondary hover:border-secondary hover:bg-white rounded hover:text-secondary`}
        >
          Create Data Stream
        </button>
      </div>
      <table className=" border-collapse  mt-8 w-[100%]">
        <thead>
          <tr>
            {columns.map((column: any, index: any) => (
              <th
                className={`${
                  column === "Config Name" ||
                  column === "Source" ||
                  column === "Duration" ||
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
                  className="border-b-[1px] text-lightBlack border-b-lightGray hover:bg-slate-50 cursor-pointer"
                  key={rowIndex}
                  onClick={handleView(row)}
                >
                  <td className="w-[200px] p-[12px] border-l-[1px] border-l-shinyGray">
                    {row?.configName}
                  </td>
                  <td className="w-[300px] p-[12px]">{row?.account?.label}</td>
                  <td className="w-[200px] p-[12px]">
                    {row?.selectedDataSource}
                  </td>
                  <td className="w-[200px] p-[12px]">
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
                  <td className="w-[200px] p-[12px] border-r-[1px] border-r-shinyGray">
                    <div className="flex gap-4">
                    <button
                        onClick={handleEdit(row)}
                        className="border-[1px] border-errorRed text-errorRed p-1 rounded w-[100px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={runSingleConfig(row?.id, rowIndex)}
                        className={`border-[1px] border-successGreen text-successGreen p-1 rounded w-[100px] ${
                          loading && selectedIndex === rowIndex
                            ? "flex items-center"
                            : ""
                        }`}
                      >
                        {loading && selectedIndex === rowIndex ? (
                          <div className="ml-1">
                            <Loader isLoading={true} />
                          </div>
                        ) : (
                          ""
                        )}
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
