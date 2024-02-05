"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreatableSelect from "react-select/creatable";

import { useSession } from "next-auth/react";
import { adAccountAsync } from "../../redux/reducers/adAccounts";
import { adCampaignAccountAsync } from "../../redux/reducers/adCampaigns";
import { setSelectedKeysInfo } from "../../redux/reducers/storeFacebookInfo";
import { configCron, days, FIELDS } from "../constant";
import { DOMAIN_URL } from "../../services";
import Modal from "../Modal";

export default function Attribute() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState({ open: false, id: -1 });
  const [fieldList, setFieldList] = useState<any>({});
  const [options, setOptions] = useState({
    accounts: [],
    campaigns: [],
    fields: FIELDS,
  });

  const { accessToken, fbEmail } =
    useSelector(
      (state: any) =>
        state.storeFacebookInfoReducer.selectedKeys.selectedFacebookUser
    ) || [];

  const selectedKeys =
    useSelector((state: any) => state.storeFacebookInfoReducer.selectedKeys) ||
    {};

  const {
    selectedAdInsights,
    selectedCampaignInsights,
    selectedAdSetInsights,
    selectedAccountLevel,
    selectedCreativeLevel,
    selectedAdSetFields,
    datePreset,
    breakdowns,
    timeIncrement,
    selectedAdSetLevel,
    configDays,
    selectedDays,
    isView,
    isEdit,
  } =
    useSelector((state: any) => state.storeFacebookInfoReducer.selectedKeys) ||
    {};

  const { adAccounts } =
    useSelector((state: any) => state.adAccountReducer) || [];
  const { adCampaignAccounts } =
    useSelector((state: any) => state.adCampaignReducer) || [];

  const { data: session } = useSession();

  useEffect(() => {
    if (selectedKeys?.account) {
      fetchDropdownData();
    }
  }, [selectedKeys?.account]);

  const fetchDropdownData = async () => {
    const { data } = await axios.post(
      `${DOMAIN_URL.prod}/api/v1/get/all/fields`,
      {
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
      }
    );
    setFieldList(data?.data);
    await dispatch(
      setSelectedKeysInfo({
        ...selectedKeys,
        selectedAdInsights: data?.data["adInsights"],
        selectedCampaignInsights: data?.data["campaignInsights"],
        selectedAdSetInsights: data?.data["adSetInsights"],
        selectedAccountLevel: data?.data["accountLevel"],
        selectedCreativeLevel: data?.data["creativeLevel"],
        selectedAdSetLevel: data?.data["adSetLevel"],
        selectedAdSetFields: data?.data["adSetFields"],
        datePreset: { label: "last_30d", value: "last_30d" },
        // breakdowns: data?.data["breakdowns"],
        timeIncrement: { label: "monthly", value: "monthly" },
      })
    );
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
      fetchAdCampaignsAccount();
  }, [adCampaignAccounts]);

  const fetchAdCampaignsAccount = async () => {
    const data: any = [];
    adCampaignAccounts && adCampaignAccounts.length > 0 ? adCampaignAccounts.map((adCampaignAccount: any) => {
      data.push({
        label: `${adCampaignAccount?.name} (${adCampaignAccount?.id})`,
        value: adCampaignAccount?.id,
        id: adCampaignAccount?.id,
      });
    }) : [];
    await dispatch(
      setSelectedKeysInfo({
        ...selectedKeys,
        campaign: data,
      })
    );
    setOptions({
      ...options,
      campaigns: data,
    });

    if(data.length === 0 ){
      setIsModal({ open: true, id: 0 })
    }
  };

  const onHandleAccountsChange = async (selected: any) => {
    const userData: any = localStorage.getItem("auth");

    await dispatch(
      setSelectedKeysInfo({
        ...selectedKeys,
        account: selected,
        userId: JSON?.parse(userData)?.userId,
      })
    );

      const params = {
        userId: JSON?.parse(userData)?.userId,
        actId: selected[selected.length - 1]?.value,
        field: "name",
        fbEmail: fbEmail
      }
      dispatch(adCampaignAccountAsync(params));
  };

  useEffect(() => {
    if (session?.accessToken || accessToken || fbEmail) {
      fetchAccounts();
    }
  }, [session?.accessToken, accessToken, fbEmail]);

  const fetchAccounts = async () => {
    const userData: any = localStorage.getItem("auth");
    const params = {
      userId: JSON?.parse(userData)?.userId,
      fbEmail: fbEmail,
    };
    dispatch(adAccountAsync(params));
  };

  const handleChange = (keyName: any) => async (selected: any) => {
    if (keyName === "configName") {
      await dispatch(
        setSelectedKeysInfo({
          ...selectedKeys,
          [keyName]: selected?.target?.value,
        })
      );
    } else if (keyName === "selectedDays") {
      let newCron = "";
      if (selected.length === 7) {
        newCron = "0 0 * * *";
      } else {
        let updated: any = [];
        selected.map((item: any) => updated.push(item?.value));
        newCron = `0 0 * * ` + updated.toString();
      }
      await dispatch(
        setSelectedKeysInfo({
          ...selectedKeys,
          [keyName]: selected,
          cron: newCron,
        })
      );
    } else {
      await dispatch(
        setSelectedKeysInfo({
          ...selectedKeys,
          [keyName]: selected,
        })
      );
    }
  };

  const handleSetDataAndMoveToNext = async () => {
    router.push("/create-data-stream/preview");
  };

  const handleConfirm = async () => {
    router.push("/create-data-stream/source");
  };

  const handleCancel = async () => {
    setIsModal({ open: false, id: -1 })
  };

  console.log(selectedKeys, 'selectedKeys')
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
          disabled={selectedKeys?.campaign.length === 0 }
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
        disabled={isView ? isView : isEdit ? !isEdit : false}
      />
      {selectedKeys?.configName && (
        <>
          <div className="grid grid-cols gap-4">
              <label>Accounts*</label>

              <Select
                onChange={onHandleAccountsChange}
                options={options?.accounts}
                value={selectedKeys?.account}
                isDisabled={isView ? isView : isEdit ? !isEdit : false}
                isMulti
              />
          </div>
          {selectedKeys.account && selectedKeys.account.length > 0 && (
            <>
              <div className="grid grid-cols gap-4">
                  <label>Campaigns*</label>
                  <Select
                    options={options?.campaigns}
                    onChange={handleChange("campaign")}
                    value={selectedKeys?.campaign}
                    isMulti
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>
{selectedKeys?.campaign.length > 0 ?
  <>
              <div className="grid grid-cols gap-4">
                  <label>Ad Insights</label>

                  <Select
                    options={fieldList["adInsights"]}
                    onChange={handleChange("selectedAdInsights")}
                    value={selectedAdInsights}
                    isMulti
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>
              <div className="grid grid-cols gap-4">
                  <label>Campaign Insights</label>

                  <Select
                    options={fieldList["campaignInsights"]}
                    isMulti
                    value={selectedCampaignInsights}
                    onChange={handleChange("selectedCampaignInsights")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Ad Set Insights</label>
                  <Select
                    isMulti
                    options={fieldList["adSetInsights"]}
                    value={selectedAdSetInsights}
                    onChange={handleChange("selectedAdSetInsights")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Account Level</label>

                  <Select
                    isMulti
                    options={fieldList["accountLevel"]}
                    value={selectedAccountLevel}
                    onChange={handleChange("selectedAccountLevel")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Creative Level</label>

                  <Select
                    options={fieldList["creativeLevel"]}
                    isMulti
                    value={selectedCreativeLevel}
                    onChange={handleChange("selectedCreativeLevel")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Ad Set Level</label>

                  <Select
                    options={fieldList["adSetLevel"]}
                    value={selectedAdSetLevel}
                    onChange={handleChange("selectedAdSetLevel")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                    isMulti
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>AdSet Fields</label>
                  <Select
                    isMulti
                    options={fieldList["adSetFields"]}
                    value={selectedAdSetFields}
                    onChange={handleChange("selectedAdSetFields")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Date Preset</label>
                  <Select
                    options={fieldList["datePreset"]}
                    value={datePreset}
                    onChange={handleChange("datePreset")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                    isClearable
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Breakdown</label>
                  <Select
                    isMulti
                    options={fieldList["breakdowns"]}
                    value={breakdowns}
                    onChange={handleChange("breakdowns")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols gap-4">
                  <label>Time Increment</label>
                  <CreatableSelect
                    options={[
                      { label: "monthly", value: "monthly" },
                      { label: "all_days", value: "all_days" },
                    ]}
                    value={timeIncrement}
                    onChange={handleChange("timeIncrement")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                  />
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <label>Schedule Data Stream</label>

                  <Select
                    options={configCron}
                    defaultValue={configCron[1]}
                    onChange={handleChange("configDays")}
                    isDisabled={isView ? isView : isEdit ? !isEdit : false}
                    value={configDays}
                  />
                </div>
                {configDays?.label === "Days" && (
                  <div className="col-span-10">
                    <label>Values</label>
                    <Select
                      isMulti
                      options={days}
                      value={selectedDays}
                      onChange={handleChange("selectedDays")}
                      isDisabled={isView ? isView : isEdit ? !isEdit : false}
                    />
                  </div>
                )}
              </div>
              {configDays?.label === "Days" ? (
                <span className="text-[red]">This config will be executed on every selected day</span>
              ) : (
                <span>
                  This config will be executed on last day of the month
                </span>
              )}
</>
:       isModal.open && <Modal handleCancel={handleCancel} handleDelete={handleConfirm} title="No Campaign Found" text="Try with different Account" buttonText1="Okay" />

          }
            </>
          )}
        </>
      )}
    </div>
  );
}
