"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { fetchFacebookConfigAsync } from "../../redux/reducers/fetchFacebookConfig";
import Lisitng from "./Listing";
import { deleteFacebookConfigAsync } from "../../redux/reducers/deleteFacebookConfig";
import { executeSingleFacebookConfigAsync } from "../../redux/reducers/executeSingleFacebookConfig";
import { setSelectedKeysInfo } from "../../redux/reducers/storeFacebookInfo";

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

  const runSingleConfig = (id: any, rowIndex: any) => (event: any) => {
    event.stopPropagation();
    setSelectedIndex(rowIndex);
    dispatch(executeSingleFacebookConfigAsync({ id: id })).then((res: any) => {
      console.log(res, "res");
      if (res.payload.data.status) {
        handleNavigate("/dataStream");
      }
    });
  };

  const handleDelete = (id: any) => (event: any) => {
    event.stopPropagation();
    dispatch(deleteFacebookConfigAsync({ id: id })).then(() => {
      fetchAllConfigs();
    });
  };

  const handleEdit = (data: any) => (event: any) => {
    event.stopPropagation();
    dispatch(
      setSelectedKeysInfo({
        ...data,
        isView: false,
        isEdit: true,
      })
    );
    handleNavigate(`/create-data-stream/source`);
  };

  const handleView = (data: any) => (event: any) => {
    event.stopPropagation();
    dispatch(
      setSelectedKeysInfo({
        ...data,
        isView: true,
        isEdit: false,
      })
    );
    handleNavigate(`/create-data-stream/source`);
  };

  return (
    <section className="pb-8 gap-12">
      <Lisitng
        data={configData}
        handleDelete={handleDelete}
        runSingleConfig={runSingleConfig}
        loading={loading}
        selectedIndex={selectedIndex}
        handleEdit={handleEdit}
        handleView={handleView}
      />
    </section>
  );
};

export default DataStreamConfigsLisitng;
