"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFacebookConfigAsync } from "../../redux/reducers/fetchFacebookConfig";
import Lisitng from "./Listing";
import { deleteFacebookConfigAsync } from "../../redux/reducers/deleteFacebookConfig";

const DataStreamConfigsLisitng = () => {
  const dispatch = useDispatch();
  const userData: any = localStorage.getItem("auth");

  const configData =
    useSelector((state: any) => state.fetchfacebookConfigReducer.configData) ||
    "";

  useEffect(() => {
    fetchAllConfigs();
  }, []);

  const fetchAllConfigs = () => {
    dispatch(
      fetchFacebookConfigAsync({ userId: JSON?.parse(userData)?.userId })
    );
  };

  const handleDelete = (id: any) => () => {
    dispatch(deleteFacebookConfigAsync({ id: id })).then(() => {
      fetchAllConfigs();
    });
  };

  return (
    <section className="pb-8 gap-12">
      <Lisitng data={configData} handleDelete={handleDelete} />
    </section>
  );
};

export default DataStreamConfigsLisitng;
