import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "./types";

export type PieData = {
  name: string;
  value: number;
};
export type DisplayMealSlice = {
  pieData: PieData[];
  displayWeek: boolean;
  recentMeals: Meal[] | [];
};

export const displayMealSlice = createSlice({
  name: "local",
  initialState: {
    pieData: [] as unknown as PieData[],
    displayWeek: false,
    recentMeals: [] as Meal[],
  },
  reducers: {
    // Use the createAction with the new name
    setPieData: {
      reducer: (state, action: PayloadAction<PieData[]>) => {
        state.pieData = action.payload;
      },
      prepare: (payload: PieData[]) => ({ payload }),
    },
    setDisplayWeek: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.displayWeek = action.payload;
      },
      prepare: (payload: boolean) => ({ payload }),
    },
    setDisplayMeals: {
      reducer: (state, action: PayloadAction<Meal[]>) => {
        state.recentMeals = action.payload;
      },
      prepare: (payload: Meal[]) => ({ payload }),
    },
  },
});

// Export the reducer and actions
export const { reducer, actions } = displayMealSlice;

// Export the createAction with the new name
export const { setPieData, setDisplayWeek, setDisplayMeals } = actions;
