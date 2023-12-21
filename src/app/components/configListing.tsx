"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacebookConfigAsync } from "../redux/reducers/fetchFacebookConfig";

import { FaEdit, FaTrash } from "react-icons/fa";

interface FormData {
  email: string;
  password: string;
}

const ConfigListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData: any = localStorage.getItem("auth");

  const configData =
    useSelector((state: any) => state.fetchfacebookConfigReducer.configData) ||
    "";

  console.log("configData", configData);
  useEffect(() => {
    fetchAllConfigs();
  }, []);

  const fetchAllConfigs = () => {
    dispatch(
      fetchFacebookConfigAsync({ userId: JSON?.parse(userData)?.userId })
    );
  };
  return (
    <section className="ml-[300px] pb-8 gap-12  ">
      {configData &&
        configData.length > 0 &&
        configData.map((item: any, index: any) => {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="flex justify-end gap-4 m-4">
                <div>
                  <FaTrash color="red" />
                </div>
                <div>
                  <FaEdit color="black" />
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {item?.account?.label}
                </div>
              </div>

              <div className="px-6 pt-4 pb-2">
                {Object.keys(item).map((configKeys: any) => {
                  if (
                    configKeys === "account" ||
                    configKeys === "userId" ||
                    configKeys === "id" ||
                    configKeys === "__v" ||
                    configKeys === "_id"
                  )
                    return;
                  if (item[configKeys].length > 0) {
                    return (
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{configKeys}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default ConfigListing;
