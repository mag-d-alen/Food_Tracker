import { JSX } from "react/jsx-runtime";
import { MealType } from "../../types";
import { useGetAllMealsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddMealModal } from "./AddMealModal";
import moment from "moment";
import { Stats } from "../Stats";
import { LoadingToasts } from "../LoadingToasts";
import { MealCardWrapper } from "./MealCardWrapper";
import { MealCardDate } from "./MealCardDate";
import { MealCardFoodItemCard } from "./MealCardFoodItemCard";
import { EditableMealName } from "./EditableMealName";

import { Header } from "./Header";
import { useSelector } from "react-redux";

export const MealsList = () => {
  const { data: allMeals, isLoading } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });

  const displayWeek = useSelector((state: any) => state.local.displayWeek);
  const meals = allMeals?.filter((meal: { created_at: moment.MomentInput }) => {
    return moment(meal.created_at).isBetween(
      displayWeek
        ? moment().subtract(7, "days")
        : moment().subtract(24, "hours"),
      moment()
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoadingToasts isLoading={isLoading} isError={false} isSuccess={false} />
      {meals ? (
        <>
          <Header />
          <Stats mealsDisplayed={meals} />
          <div className="list-container">
            <AddMealModal />
            <div className="meals-list">
              {meals.map((meal: JSX.IntrinsicAttributes & MealType) => (
                <MealCardWrapper key={meal.id} item={meal}>
                  <EditableMealName meal={meal} />
                  <MealCardDate detail={meal.created_at} />
                  {meal.food_items ? (
                    <>
                      {meal.food_items.map((item: any) => (
                        <MealCardFoodItemCard
                          key={item.id}
                          item={item}
                          meal={meal}
                        />
                      ))}
                      <div>total kcal: {meal.total_meal_kcal}</div>
                    </>
                  ) : (
                    <div>No food recorded</div>
                  )}
                </MealCardWrapper>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No recent meals</div>
      )}
    </div>
  );
};
