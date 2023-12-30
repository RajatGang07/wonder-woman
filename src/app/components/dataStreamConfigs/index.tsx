"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { fetchFacebookConfigAsync } from "../../redux/reducers/fetchFacebookConfig";
import Lisitng from "./Listing";
import { deleteFacebookConfigAsync } from "../../redux/reducers/deleteFacebookConfig";
import { executeSingleFacebookConfigAsync } from "../../redux/reducers/executeSingleFacebookConfig";

const DataStreamConfigsLisitng = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dispatch = useDispatch();
  const userData: any = localStorage.getItem("auth");
  const router = useRouter();

  const configData =
    useSelector((state: any) => state.fetchfacebookConfigReducer.configData) ||
    "";

  const loading =
    useSelector(
      (state: any) => state.executeSingleFacebookConfigSliceReducer.loading
    ) || false;

  useEffect(() => {
    fetchAllConfigs();
  }, []);

  const fetchAllConfigs = () => {
    dispatch(
      fetchFacebookConfigAsync({ userId: JSON?.parse(userData)?.userId })
    );
  };

  const handleNavigate = (route: any) => {
    router.push(route);
  };

  const runSingleConfig = (id: any, rowIndex: any) => () => {
    setSelectedIndex(rowIndex);
    dispatch(executeSingleFacebookConfigAsync({ id: id })).then((res: any) => {
      console.log(res, "res");
      if (res.payload.data.status) {
        handleNavigate("/dataStream");
      }
    });
  };

  const handleDelete = (id: any) => () => {
    dispatch(deleteFacebookConfigAsync({ id: id })).then(() => {
      fetchAllConfigs();
    });
  };

  return (
    <section className="pb-8 gap-12">
      <Lisitng
        data={configData}
        handleDelete={handleDelete}
        runSingleConfig={runSingleConfig}
        loading={loading}
        selectedIndex={selectedIndex}
      />
    </section>
  );
};

export default DataStreamConfigsLisitng;
