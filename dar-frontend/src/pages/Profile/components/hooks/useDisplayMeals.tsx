
import { useGetAllMealsQuery } from "@/app/apiSlice";
import { RootState } from "@/app/store";
import { Meal } from "@/app/types";
import moment from "moment";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useDisplayMeals = () => {
  const { data: allMeals } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });

  const displayWeek = useSelector(
    (state: RootState) => state.displayMealSlice.displayWeek
  );
  const meals: Meal[] = useMemo(() => {
    return allMeals?.filter((meal: { created_at: moment.MomentInput }) => {
      return moment(meal.created_at).isBetween(
        displayWeek
          ? moment().subtract(7, "days")
          : moment().subtract(96, "hours"),
        moment()
      );
    });
  }, [allMeals, displayWeek]);
  return {
    displayWeek,
    meals,
  }
};
