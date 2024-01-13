"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { fetchFacebookConfigAsync } from "../../redux/reducers/fetchFacebookConfig";
import Lisitng from "./Listing";
import { deleteFacebookConfigAsync } from "../../redux/reducers/deleteFacebookConfig";
import { executeSingleFacebookConfigAsync } from "../../redux/reducers/executeSingleFacebookConfig";
import { setSelectedKeysInfo } from "../../redux/reducers/storeFacebookInfo";
import Modal from "../Modal";

const DataStreamConfigsLisitng = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isModal, setIsModal] = useState({ open: false, id: -1 });
  const dispatch = useDispatch();
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
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const fetchAllConfigs = () => {
    const userData: any = localStorage.getItem("auth");
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
      if (res?.payload?.data?.status) {
        handleNavigate("/dataStream");
      } else {
        toast.error(res?.payload, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const handleDelete = (id: any) => (event: any) => {
    event.stopPropagation();
    setIsModal({ open: true, id: id });
    // dispatch(deleteFacebookConfigAsync({ id: id })).then(() => {
    //   fetchAllConfigs();
    // });
  };

  const handleConfirmDelete = (event: any) => {
    event.stopPropagation();
    dispatch(deleteFacebookConfigAsync({ id: isModal?.id })).then(() => {
      fetchAllConfigs();
      setSelectedIndex(-1);
      setIsModal({ open: false, id: -1 });
    });
  };

  const handleCancel = (id: any) => (event: any) => {
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
      {isModal.open && <Modal handleCancel={handleCancel} handleDelete={handleConfirmDelete} />}
    </section>
  );
};

export default DataStreamConfigsLisitng;
