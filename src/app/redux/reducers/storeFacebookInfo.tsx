import { createSlice } from "@reduxjs/toolkit";

const selectedKeyInitialState = {
  selectedKeys: {
    selectedDataSource: "",
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
    cron: "0 0 28-31 * *",
    selectedFacebookUser: {},
    datePreset: {},
    breakdowns: [],
    timeIncrement: {},
  },
};

const selectedKeySlice = createSlice({
  name: "selectedKeys",
  initialState: selectedKeyInitialState,
  reducers: {
    setSelectedKeysInfo: (state, action) => {
      state.selectedKeys.configName = action?.payload?.configName;
      state.selectedKeys.account = action?.payload?.account;
      state.selectedKeys.campaign = action?.payload?.campaign;
      state.selectedKeys.userId = action?.payload?.userId;
      state.selectedKeys.selectedAdInsights =
        action?.payload?.selectedAdInsights;
      state.selectedKeys.selectedCampaignInsights =
        action?.payload?.selectedCampaignInsights;
      state.selectedKeys.selectedAdSetInsights =
        action?.payload?.selectedAdSetInsights;
      state.selectedKeys.selectedAccountLevel =
        action?.payload?.selectedAccountLevel;
      state.selectedKeys.selectedCreativeLevel =
        action?.payload?.selectedCreativeLevel;
      state.selectedKeys.selectedAdSetLevel =
        action?.payload?.selectedAdSetLevel;
      state.selectedKeys.selectedAdSetFields =
        action?.payload?.selectedAdSetFields;
      state.selectedKeys.configDays = action?.payload?.configDays;
      state.selectedKeys.selectedDays = action?.payload?.selectedDays;
      state.selectedKeys.cron = action?.payload?.cron;
      state.selectedKeys.datePreset =
        action?.payload?.selectedDatePreset;
      state.selectedKeys.breakdowns =
        action?.payload?.selectedBreakdowns;
      state.selectedKeys.timeIncrement =
        action?.payload?.selectedTimeIncrement;
    },
    setSelectedDataSource: (state, action) => {
      state.selectedKeys.selectedDataSource = action.payload;
    },
    setSelectedFacebookUser: (state, action) => {
      state.selectedKeys.selectedFacebookUser = action.payload;
    },
  },
});

export const { setSelectedKeysInfo }: any = selectedKeySlice.actions;
export const { setSelectedDataSource }: any = selectedKeySlice.actions;
export const { setSelectedFacebookUser }: any = selectedKeySlice.actions;

export const selectedKeyInfo = (state: any) => state.selectedKeys;
export const selectedDataSource = (state: any) =>
  state.selectedKeys.selectedDataSource;
export const selectedFacebookUser = (state: any) =>
  state.selectedKeys.selectedFacebookUser;

export default selectedKeySlice.reducer;
