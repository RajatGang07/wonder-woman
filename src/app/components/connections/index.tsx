"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { facebookGetDetailsAsync } from "../../redux/reducers/facebookGetCredentials";
import Lisitng from "./Listing";
import { facebookDisconnectDetailsAsync } from "../../redux/reducers/facebookDisconnectUser";

const ConenctionListing = () => {
  const dispatch = useDispatch();
  const userData: any = localStorage.getItem("auth");

  const facebookUserList =
    useSelector(
      (state: any) => state.facebookGetUserListReducer.facebookList
    ) || [];

  useEffect(() => {
    if (JSON?.parse(userData)?.userId) {
      facebookGetDetails();
    }
  }, [JSON?.parse(userData)?.userId]);

  const facebookGetDetails = () => {
    dispatch(
      facebookGetDetailsAsync({ userId: JSON?.parse(userData)?.userId })
    );
  };

  const handleDisconnect = (id: any) => () => {
    dispatch(
      facebookDisconnectDetailsAsync({ id: id })
    ).then(() => {
      facebookGetDetails();
    });
  };

  console.log("facebookUserList", facebookUserList);
  return (
    <section className="pb-8 gap-12">
      <Lisitng data={facebookUserList} handleDisconnect={handleDisconnect} />
    </section>
  );
};

export default ConenctionListing;
