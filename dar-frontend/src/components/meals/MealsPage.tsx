import { JSX } from "react/jsx-runtime";
import { FoodItemType } from "../../types";
import { useGetAllMealsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddMealModal } from "./AddMealModal";
import { MealCard } from "./MealCard";
import moment from "moment";
import { TotalDailyKcal } from "../TotalDailyKcal";

export const MealsPage = () => {
  const { data: meals, isLoading } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [addMealVisible, setAddMealVisible] = useState(false);
  const toggleAddMealForm = () => setAddMealVisible(!addMealVisible);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {!addMealVisible && meals ? (
        <>
          <h2>Meals {moment().format("DD.MM.YYYY")}</h2>
          <TotalDailyKcal allMeals={meals} />
        </>
      ) : null}
      <button onClick={toggleAddMealForm}>Add a meal</button>
      {addMealVisible ? (
        <>
          <AddMealModal closeAddMeal={toggleAddMealForm} />
          <button onClick={() => setAddMealVisible(false)}>Back</button>
        </>
      ) : meals ? (
        meals.map((item: JSX.IntrinsicAttributes & FoodItemType) => (
          <MealCard key={item.id} {...item} />
        ))
      ) : (
        <div>No recent meals</div>
      )}
    </div>
  );
};
