import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export type SliceDataType = {
  name: string;
  value: number;
};

export const createSetPieData = createAction<SliceDataType[]>("setPieData");

export const pieSlice = createSlice({
  name: "pieData",
  initialState: {
    pieData: [] as unknown as SliceDataType[],
  },
  reducers: {
    // Use the createAction with the new name
    setPieData: {
      reducer: (state, action: PayloadAction<SliceDataType[]>) => {
        state.pieData = action.payload;
      },
      prepare: (payload: SliceDataType[]) => ({ payload }),
    },
  },
});

// Export the reducer and actions
export const { reducer, actions } = pieSlice;

// Export the createAction with the new name
export const { setPieData } = actions;
