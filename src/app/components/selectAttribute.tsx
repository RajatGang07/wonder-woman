"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { useSession } from "next-auth/react";
import { adAccountAsync } from "../redux/reducers/adAccounts";
import { adCampaignAccountAsync } from "../redux/reducers/adCampaigns";

export default function SelectAttribute(props: any) {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const [options, setOptions] = useState({
    accounts: [],
    campaigns: [],
    fields: [],
  });
  const dispatch = useDispatch();
  const { adAccounts } =
    useSelector((state: any) => state.adAccountReducer) || [];
    const { adCampaignAccounts } =
    useSelector((state: any) => state.adCampaignReducer) || [];
  const userData: any = localStorage.getItem("auth");

  const { data: session } = useSession();

  console.log("session", session, adAccounts, options);

  useEffect(() => {
    if (adAccounts?.length > 0) {
      const data: any = [];
      adAccounts.map((adAccount: any) => {
        data.push({
          label: `${adAccount?.name} (${adAccount?.id})`,
          value: adAccount?.id,
          id: adAccount?.account_id,
        });
      });
      setOptions({
        ...options,
        accounts: data,
      });
    }
  }, [adAccounts]);

  useEffect(() => {
    if (adCampaignAccounts?.length > 0) {
      const data: any = [];
      adCampaignAccounts.map((adCampaignAccount: any) => {
        data.push({
          label: `${adCampaignAccount?.name} (${adCampaignAccount?.id})`,
          value: adCampaignAccount?.id,
          id: adCampaignAccount?.id,
        });
      });
      setOptions({
        ...options,
        campaigns: data,
      });
    }
  }, [adCampaignAccounts]);

  const onHandleAccountsChange = (seleted: any) => {
    const params = {
      userId: JSON?.parse(userData)?.userId,
      actId: seleted?.value,
      field: "name"
    };
    dispatch(adCampaignAccountAsync(params));
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchAccounts();
    }
  }, [session?.accessToken]);

  const fetchAccounts = async () => {
    const params = {
      userId: JSON?.parse(userData)?.userId,
    };
    dispatch(adAccountAsync(params));
  };

  return (
    <div className="flex justify-between flex-col ml-[300px] pb-8 gap-4 w-60">
      <label>Accounts</label>

      <Select
        defaultValue={selectedOption}
        onChange={onHandleAccountsChange}
        options={options?.accounts}
      />

      <label>Campaigns</label>

      <Select
        defaultValue={selectedOption}
        // onChange={handleSelectedOption}
        options={options?.campaigns}
      />

      <label>Fields</label>

      <Select
        defaultValue={selectedOption}
        // onChange={handleSelectedOption}
        options={options?.fields}
      />
    </div>
  );
}
