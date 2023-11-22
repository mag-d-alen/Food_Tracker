import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealType } from "../types";

export type SliceDataType = {
  name: string;
  value: number;
};
export type SliceStateType = {
  pieData: SliceDataType[];
  displayWeek: boolean;
  displayMeals: MealType[];
};

export const localSlice = createSlice({
  name: "local",
  initialState: {
    pieData: [] as unknown as SliceDataType[],
    displayWeek: false,
    mealsDisplayed: [] as unknown as MealType[],
  },
  reducers: {
    // Use the createAction with the new name
    setPieData: {
      reducer: (state, action: PayloadAction<SliceDataType[]>) => {
        state.pieData = action.payload;
      },
      prepare: (payload: any[]) => ({ payload }),
    },
    setDisplayWeek: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.displayWeek = action.payload;
      },
      prepare: (payload: boolean) => ({ payload }),
    },
  },
});

// Export the reducer and actions
export const { reducer, actions } = localSlice;

// Export the createAction with the new name
export const { setPieData, setDisplayWeek } = actions;
