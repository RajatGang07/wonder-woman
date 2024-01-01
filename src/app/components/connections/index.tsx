"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { facebookGetDetailsAsync } from "../../redux/reducers/facebookGetCredentials";
import Lisitng from "./Listing";
import { facebookDisconnectDetailsAsync } from "../../redux/reducers/facebookDisconnectUser";

const ConenctionListing = () => {
  const dispatch = useDispatch();

  const facebookUserList =
    useSelector(
      (state: any) => state.facebookGetUserListReducer.facebookList
    ) || [];

  useEffect(() => {
    facebookGetDetails();
  }, []);

  const facebookGetDetails = () => {
    const userData: any = localStorage.getItem("auth");
    dispatch(
      facebookGetDetailsAsync({ userId: JSON?.parse(userData)?.userId })
    );
  };

  const handleDisconnect = (id: any) => () => {
    dispatch(facebookDisconnectDetailsAsync({ id: id })).then(() => {
      facebookGetDetails();
    });
  };

  return (
    <section className="pb-8 gap-12">
      <Lisitng data={facebookUserList} handleDisconnect={handleDisconnect} />
    </section>
  );
};

export default ConenctionListing;
