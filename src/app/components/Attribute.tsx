"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreatableSelect from "react-select/creatable";

import { useSession } from "next-auth/react";
import { adAccountAsync } from "../redux/reducers/adAccounts";
import { adCampaignAccountAsync } from "../redux/reducers/adCampaigns";
import { setSelectedKeysInfo } from "../redux/reducers/storeFacebookInfo";
import { configCron, days, FIELDS } from "./constant";
import { DOMAIN_URL } from "../services";

export default function Attribute(props: any) {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [fieldList, setFieldList] = useState<any>({});
  const [selectedKeys, setSelectedKeys] = useState<any>({
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
    cron: "0 0 28-31 * *", //  job will run every day from the 28th to the 31st day of the month at midnight (0:00).
    selectedDatePreset: {},
    selectedBreakdowns: [],
    selectedTimeIncrement: {},
  });
  const [options, setOptions] = useState({
    accounts: [],
    campaigns: [],
    fields: FIELDS,
  });

  const state = useSelector((state: any) => state) || [];

  console.log("state", state);

  const { accessToken } =
    useSelector(
      (state: any) =>
        state.storeFacebookInfoReducer.selectedKeys.selectedFacebookUser
    ) || [];

  const { adAccounts } =
    useSelector((state: any) => state.adAccountReducer) || [];
  const { adCampaignAccounts } =
    useSelector((state: any) => state.adCampaignReducer) || [];
  const userData: any = localStorage.getItem("auth");

  const { data: session } = useSession();

  useEffect(() => {
    if (selectedKeys?.account) {
      fetchDropdownData();
    }
  }, [selectedKeys?.account]);

  const fetchDropdownData = async () => {
    const { data } = await axios.post(`${DOMAIN_URL.prod}/api/v1/get/all/fields`, {
      insightNameList: [
        "adInsights",
        "campaignInsights",
        "adSetInsights",
        "accountLevel",
        "creativeLevel",
        "adSetLevel",
        "adSetFields",
        "datePreset",
        "breakdowns",
      ],
    });
    setFieldList(data?.data);

    setSelectedKeys({
      ...selectedKeys,
      selectedAdInsights: data?.data["adInsights"],
      selectedCampaignInsights: data?.data["campaignInsights"],
      selectedAdSetInsights: data?.data["adSetInsights"],
      selectedAccountLevel: data?.data["accountLevel"],
      selectedCreativeLevel: data?.data["creativeLevel"],
      selectedAdSetLevel: data?.data["adSetLevel"],
      selectedAdSetFields: data?.data["adSetFields"],
      selectedDatePreset: { label: "last_30d", value: "last_30d" },
      // selectedBreakdowns: data?.data["breakdowns"],
      selectedTimeIncrement: { label: "monthly", value: "monthly" },
    });
  };

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
      setSelectedKeys({
        ...selectedKeys,
        campaign: data,
      });
      setOptions({
        ...options,
        campaigns: data,
      });
    }
  }, [adCampaignAccounts]);

  const onHandleAccountsChange = (selected: any) => {
    setSelectedKeys({
      ...selectedKeys,
      account: selected,
      userId: JSON?.parse(userData)?.userId,
    });

    const params = {
      userId: JSON?.parse(userData)?.userId,
      actId: selected?.value,
      field: "name",
    };

    dispatch(adCampaignAccountAsync(params));
  };

  useEffect(() => {
    if (session?.accessToken || accessToken) {
      fetchAccounts();
    }
  }, [session?.accessToken, accessToken]);

  const fetchAccounts = async () => {
    const params = {
      userId: JSON?.parse(userData)?.userId,
    };
    dispatch(adAccountAsync(params));
  };

  const handleChange = (keyName: any) => (selected: any) => {
    if (keyName === "configName") {
      setSelectedKeys({
        ...selectedKeys,
        [keyName]: selected?.target?.value,
      });
    } else if (keyName === "selectedDays") {
      let newCron = "";
      if (selected.length === 7) {
        newCron = "0 0 * * *";
      } else {
        let updated: any = [];
        selected.map((item: any) => updated.push(item?.value));
        newCron = `0 0 * * ` + updated.toString();
      }
      setSelectedKeys({
        ...selectedKeys,
        [keyName]: selected,
        cron: newCron,
      });
    } else {
      setSelectedKeys({
        ...selectedKeys,
        [keyName]: selected,
      });
    }
  };

  const handleSetDataAndMoveToNext = async () => {
    await dispatch(setSelectedKeysInfo(selectedKeys));
    router.push("/create-data-stream/preview");
  };

  return (
    <div className="flex justify-between flex-col pb-8 gap-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Select Attributes</h1>
        <button
          onClick={
            selectedKeys?.account === "" ? () => {} : handleSetDataAndMoveToNext
          }
          className={`bg-transparent  hover:bg-secondary text-secondary font-semibold hover:text-white py-2 px-4 border border-secondary hover:border-transparent rounded ${
            selectedKeys?.account === "" ? " opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
      <label>Data Stream Name*</label>
      <input
        type="text"
        className="border-[1px] border-grey p-2"
        onChange={handleChange("configName")}
        value={selectedKeys?.configName}
      />
      {selectedKeys?.configName && (
        <>
          <div className="grid grid-cols gap-4">
            <>
              <label>Accounts*</label>

              <Select
                // defaultValue={selectedOption}
                onChange={onHandleAccountsChange}
                options={options?.accounts}
                value={selectedKeys?.account}
              />
            </>
          </div>
          {selectedKeys.account && (
            <>
              <div className="grid grid-cols gap-4">
                <>
                  <label>Campaigns*</label>

                  <Select
                    // defaultValue={selectedOption}
                    options={options?.campaigns}
                    onChange={handleChange("campaign")}
                    value={selectedKeys?.campaign}
                    isMulti
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Ad Insights</label>

                  <Select
                    options={fieldList["adInsights"]}
                    onChange={handleChange("selectedAdInsights")}
                    value={selectedKeys?.selectedAdInsights}
                    isMulti
                  />
                </>
              </div>
              <div className="grid grid-cols gap-4">
                <>
                  <label>Campaign Insights</label>

                  <Select
                    options={fieldList["campaignInsights"]}
                    isMulti
                    value={selectedKeys?.selectedCampaignInsights}
                    onChange={handleChange("selectedCampaignInsights")}
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Ad Set Insights</label>

                  <Select
                    isMulti
                    options={fieldList["adSetInsights"]}
                    value={selectedKeys?.selectedAdSetInsights}
                    onChange={handleChange("selectedAdSetInsights")}
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Account Level</label>

                  <Select
                    isMulti
                    options={fieldList["accountLevel"]}
                    value={selectedKeys?.selectedAccountLevel}
                    onChange={handleChange("selectedAccountLevel")}
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Creative Level</label>

                  <Select
                    options={fieldList["creativeLevel"]}
                    isMulti
                    value={selectedKeys?.selectedCreativeLevel}
                    onChange={handleChange("selectedCreativeLevel")}
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Ad Set Level</label>

                  <Select
                    options={fieldList["adSetLevel"]}
                    value={selectedKeys?.selectedAdSetLevel}
                    onChange={handleChange("selectedAdSetLevel")}
                    isMulti
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>AdSet Fields</label>
                  <Select
                    isMulti
                    options={fieldList["adSetFields"]}
                    value={selectedKeys?.selectedAdSetFields}
                    onChange={handleChange("selectedAdSetFields")}
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Date Preset</label>
                  <Select
                    options={fieldList["datePreset"]}
                    value={selectedKeys?.selectedDatePreset}
                    onChange={handleChange("selectedDatePreset")}
                    isClearable
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Breakdown</label>
                  <Select
                    isMulti
                    options={fieldList["breakdowns"]}
                    value={selectedKeys?.selectedBreakdowns}
                    onChange={handleChange("selectedBreakdowns")}
                  />
                </>
              </div>

              <div className="grid grid-cols gap-4">
                <>
                  <label>Time Increment</label>
                  <CreatableSelect
                    options={[
                      { label: "monthly", value: "monthly" },
                      { label: "all_days", value: "all_days" },
                    ]}
                    value={selectedKeys?.selectedTimeIncrement}
                    onChange={handleChange("selectedTimeIncrement")}
                  />
                </>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <label>Schedule Data Stream</label>

                  <Select
                    options={configCron}
                    defaultValue={configCron[1]}
                    onChange={handleChange("configDays")}
                    value={selectedKeys?.configDays}
                  />
                </div>
                {selectedKeys?.configDays?.label === "Days" && (
                  <div className="col-span-10">
                    <label>Values</label>
                    <Select
                      isMulti
                      options={days}
                      value={selectedKeys?.selectedDays}
                      onChange={handleChange("selectedDays")}
                    />
                  </div>
                )}
              </div>
              {selectedKeys?.configDays?.label === "Days" ? (
                <span>This config will be executed on every selected day</span>
              ) : (
                <span>
                  This config will be executed on last day of the month
                </span>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
