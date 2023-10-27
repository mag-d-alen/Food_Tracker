import { JSX } from "react/jsx-runtime";
import { FoodItemType } from "../../types";
import { useGetAllMealsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddMealModal } from "./AddMealModal";
import { MealCard } from "./MealCard";
import moment from "moment";
import { TotalDailyKcal } from "../TotalDailyKcal";
import { LoadingToasts } from "../LoadingToasts";

export const MealsPage = () => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        <button style={{ height: "5rem" }} onClick={toggleAddMealForm}>
          Add a meal
        </button>
        {addMealVisible ? (
          <AddMealModal closeAddMeal={toggleAddMealForm} />
        ) : meals ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "70vh",
              overflowY: "auto",
              borderRadius: "0.3rem",
              flex: "1",
            }}
          >
            {meals.map((item: JSX.IntrinsicAttributes & FoodItemType) => (
              <MealCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div>No recent meals</div>
        )}
      </div>
    </div>
  );
};
