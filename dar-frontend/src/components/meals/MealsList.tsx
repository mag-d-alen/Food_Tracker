import { JSX } from "react/jsx-runtime";
import { FoodItemType } from "../../types";
import { useGetAllMealsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddMealModal } from "./AddMealModal";
import moment from "moment";
import { TotalDailyKcal } from "../TotalDailyKcal";
import { LoadingToasts } from "../LoadingToasts";
import { MealCardWrapper } from "./MealCardWrapper";

export const MealsList = () => {
  const { data: meals, isLoading } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [addMealVisible, setAddMealVisible] = useState(false);
  const toggleAddMealForm = () => setAddMealVisible(!addMealVisible);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoadingToasts isLoading={isLoading} isError={false} isSuccess={false} />

      {!addMealVisible && meals ? (
        <>
          <h2>Meals {moment().format("DD.MM.YYYY")}</h2>
          <TotalDailyKcal allMeals={meals} />
        </>
      ) : null}

      <div className="list-container">
        {!addMealVisible && (
          <button onClick={toggleAddMealForm}>Add a meal</button>
        )}
        {addMealVisible ? (
          <AddMealModal closeAddMeal={toggleAddMealForm} />
        ) : meals ? (
          <div className="meals-list">
            {meals.map((item: JSX.IntrinsicAttributes & FoodItemType) => (
              <MealCardWrapper item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div>No recent meals</div>
        )}
      </div>
    </div>
  );
};
