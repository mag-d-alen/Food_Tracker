import { useGetAllMealsQuery } from "@/app/apiSlice";
import { setDisplayWeek, setDisplayMeals } from "@/app/displayMealSlice";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchUserData = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, data } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (!data) return;
    const recentMeals = data.filter(
      (meal: { created_at: moment.MomentInput }) =>
        moment(meal.created_at) > moment().subtract(7, "days")
    );
    dispatch(setDisplayWeek(false));
    dispatch(setDisplayMeals(recentMeals));
  }, [data]);
  return {
    isLoading,
    isError,
    isSuccess,
    data,
  };
};
