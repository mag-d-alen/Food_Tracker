import { useGetAllMealsQuery } from "@/app/apiSlice";
import moment from "moment";
import { MealCardWrapper } from "../MealCard/MealCardWrapper";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Meal } from "@/app/types";
import "./MealsList.css";
import { useDisplayMeals } from "../hooks";

export const MealsList = () => {
  const { meals } = useDisplayMeals();

  return (
    <>
      {meals ? (
        <>
          <div className="list-container">
            <div className="meals-list">
              {meals.map((meal: Meal) => (
                <MealCardWrapper key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No recent meals</div>
      )}
    </>
  );
};
