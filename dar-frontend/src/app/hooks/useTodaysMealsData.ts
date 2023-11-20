import moment from "moment";
import { useState, useEffect } from "react";
import { MealType } from "../../types";
import { useGetAllMealsQuery } from "../apiSlice";

export const useTodaysMealsData = () => {
  const { isLoading, data: meals } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [todayMealsData, setTodayMealsData] = useState<
    { name: string; value: number }[]
  >([]);
  useEffect(() => {
    if (!meals) return;
    meals
      .filter((m) => moment(m.created_at) >= moment().startOf("day"))
      .forEach((m: MealType) => {
        setTodayMealsData([
          ...todayMealsData,
          { name: m.name, value: m.total_meal_kcal },
        ]);
      });
  }, [meals]);
  return { isLoading, todayMealsData };
};
