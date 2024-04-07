import { RootState } from "@/app/store";
import { Meal } from "@/app/types";
import moment from "moment";
import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useFetchStatsData = () => {
  const weeklyMeals = useSelector(
    (state: RootState) => state.displayMealSlice.recentMeals
  );
  const displayWeek = useSelector(
    (state: RootState) => state.displayMealSlice.displayWeek
  );
  const navigate = useNavigate();


  const mealsDisplayed = useMemo(
    () =>
      displayWeek
        ? weeklyMeals
        : weeklyMeals.filter((meal) =>
            moment(meal.created_at).isSame(moment(), "day")
          ),
    [weeklyMeals, displayWeek]
  );

  const dailyTotalKcal = useCallback(
    () =>
      mealsDisplayed &&
      mealsDisplayed.reduce(
        (acc: number, meal: Meal) => acc + meal.total_meal_kcal,
        0
      ),
    [mealsDisplayed]
  );
  return {
    dailyTotalKcal,
    mealsDisplayed,
    displayWeek,
    navigate,
  };
};
