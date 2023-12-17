"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { adAccountAsync } from "../redux/reducers/adAccounts";
import { adCampaignAccountAsync } from "../redux/reducers/adCampaigns";
import { setSelectedKeysInfo } from "../redux/reducers/storeFacebookInfo";

export default function SelectAttribute(props: any) {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const router = useRouter();

  const [adInsights, setAdInsights] = useState([]);
  const [campaignInsights, setCampaignInsights] = useState([]);
  const [adSetInsights, setAdSetInsights] = useState([]);
  const [accountLevel, setAccountLevel] = useState([]);
  const [creativeLevel, setCreativeLevel] = useState([]);
  const [adSetLevel, setAdSetLevel] = useState([]);
  const [campaignFields, setCampaignFields] = useState([]);

  const [selectedKeys, setSelectedKeys] = useState({
    account: "",
    campaign: [],
    userId: "",
    selectedAdInsights: [],
    selectedCampaignInsights: [],
    selectedAdSetInsights: [],
    selectedAccountLevel: [],
    selectedCreativeLevel: [],
    selectedAdSetLevel: [],
    selectedCampaignFields: [],
  });
  const [options, setOptions] = useState({
    accounts: [],
    campaigns: [],
    fields: [
      {
        label: "Ad Insights",
        value: "facebook-ad-insights",
      },
      {
        label: "Campaign Insights",
        value: "facebook-campaign-insights",
      },
      {
        label: "AdSet Insights",
        value: "facebook-ad-set-insights",
      },
      {
        label: "Account Level",
        value: "facebook-account-levels",
      },
      {
        label: "Creative Level",
        value: "facebook-ad-creatives-levels",
      },
      {
        label: "Ad Set Level",
        value: "facebook-ad-set-levels",
      },
      {
        label: "Campaign Fields",
        value: "facebook-campaign-fields",
      },
    ],
  });
  const dispatch = useDispatch();
  const { adAccounts } =
    useSelector((state: any) => state.adAccountReducer) || [];
  const { adCampaignAccounts } =
    useSelector((state: any) => state.adCampaignReducer) || [];
  const userData: any = localStorage.getItem("auth");

  const { data: session } = useSession();

  useEffect(() => {
    fetchDropdownData();
  }, []);
  const backendURL = "http://localhost:8080";

  const fetchDropdownData = async () => {
    const adInsightsResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "adInsights" }
    );
    setAdInsights(adInsightsResponse?.data?.data);

    const campaignInsightsResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "campaignInsights" }
    );
    setCampaignInsights(campaignInsightsResponse?.data?.data);

    const adSetInsightsResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "adSetInsights" }
    );
    setAdSetInsights(adSetInsightsResponse?.data?.data);

    const accountLevelResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "accountLevel" }
    );
    setAccountLevel(accountLevelResponse?.data?.data);

    const creativeLevelResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "creativeLevel" }
    );
    setCreativeLevel(creativeLevelResponse?.data?.data);

    const adSetLevelResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "adSetLevel" }
    );
    setAdSetLevel(adSetLevelResponse?.data?.data);

    const campaignFieldsResponse = await axios.post(
      `${backendURL}/api/v1/ad/insights/fields`,
      { insightName: "campaignFields" }
    );
    setCampaignFields(campaignFieldsResponse?.data?.data);

    setSelectedKeys({
      ...selectedKeys,
      selectedAdInsights: adInsightsResponse?.data?.data,
      selectedCampaignInsights: campaignInsightsResponse?.data?.data,
      selectedAdSetInsights: adSetInsightsResponse?.data?.data,
      selectedAccountLevel: accountLevelResponse?.data?.data,
      selectedCreativeLevel: creativeLevelResponse?.data?.data,
      selectedAdSetLevel: adSetLevelResponse?.data?.data,
      selectedCampaignFields: campaignFieldsResponse?.data?.data,
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

  const handleChange = (keyName: any) => (selected: any) => {
    setSelectedKeys({
      ...selectedKeys,
      [keyName]: selected,
    });
  };

  const handleSetDataAndMoveToNext = () => {
    dispatch(setSelectedKeysInfo(selectedKeys));

    router.push("/schedule");
  };

  return (
    <div className="flex justify-between flex-col ml-[300px] pb-8 gap-4 w-[1000px]">
      <label>Accounts</label>
      <Select
        defaultValue={selectedOption}
        onChange={onHandleAccountsChange}
        options={options?.accounts}
      />
      {selectedKeys.account && (
        <>
          <label>Campaigns</label>
          <Select
            defaultValue={selectedOption}
            options={options?.campaigns}
            onChange={handleChange("campaign")}
            value={selectedKeys?.campaign}
            isMulti
          />

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Ad Insights</label>

              <Select
                defaultValue={options?.fields[0]}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                options={adInsights}
                onChange={handleChange("adInsights")}
                value={selectedKeys?.selectedAdInsights}
                isMulti
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Campaign Insights</label>

              <Select
                defaultValue={options?.fields[1]}
                // onChange={handleSelectedOption}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                options={campaignInsights}
                isMulti
                value={selectedKeys?.selectedCampaignInsights}
                onChange={handleChange("campaignInsights")}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Ad Set Insights</label>

              <Select
                defaultValue={options?.fields[2]}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                isMulti
                options={adSetInsights}
                value={selectedKeys?.selectedAdSetInsights}
                onChange={handleChange("adSetInsights")}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Account Level</label>

              <Select
                defaultValue={options?.fields[3]}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                isMulti
                options={accountLevel}
                value={selectedKeys?.selectedAccountLevel}
                onChange={handleChange("accountLevel")}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Creative Level</label>

              <Select
                defaultValue={options?.fields[4]}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                options={creativeLevel}
                isMulti
                value={selectedKeys?.selectedCreativeLevel}
                onChange={handleChange("creativeLevel")}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Ad Set Level</label>

              <Select
                defaultValue={options?.fields[5]}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                options={adSetLevel}
                value={selectedKeys?.selectedAdSetLevel}
                onChange={handleChange("adSetLevel")}
                isMulti
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[200px]">
              <label>Campaign Fields</label>

              <Select
                defaultValue={options?.fields[6]}
                options={options?.fields}
                isDisabled
              />
            </div>
            <div className="flex flex-col w-[800px]">
              <label>Values</label>

              <Select
                isMulti
                options={campaignFields}
                value={selectedKeys?.selectedCampaignFields}
                onChange={handleChange("campaignFields")}
              />
            </div>
          </div>
        </>
      )}
      
        <div className="inline-flex justify-end">
          <button
            onClick={() => router.push("/authorize")}
            className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          <button
            onClick={handleSetDataAndMoveToNext}
            className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
    </div>
  );
}
