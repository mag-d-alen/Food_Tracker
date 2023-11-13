import { JSX } from "react/jsx-runtime";
import { MealType } from "../../types";
import { useGetAllMealsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddMealModal } from "./AddMealModal";
import moment from "moment";
import { TotalDailyKcal } from "../TotalDailyKcal";
import { LoadingToasts } from "../LoadingToasts";
import { MealCardWrapper } from "./MealCardWrapper";
import { MealCardDate } from "./MealCardDate";
import { MealCardFoodItemCard } from "./MealCardFoodItemCard";
import { EditableMealName } from "./EditableMealName";

export const MealsList = () => {
  const { data: allMeals, isLoading } = useGetAllMealsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [addMealVisible, setAddMealVisible] = useState(false);
  const toggleAddMealForm = () => setAddMealVisible(!addMealVisible);
  const [weekDataShown, setWeekDataShown] = useState(false);

  const meals = allMeals?.filter((meal: { created_at: moment.MomentInput }) => {
    return moment(meal.created_at).isBetween(
      weekDataShown
        ? moment().subtract(7, "days")
        : moment().subtract(24, "hours"),
      moment()
    );
  });
  const todaysDate = moment().format("DD.MM.YYYY");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoadingToasts isLoading={isLoading} isError={false} isSuccess={false} />

      {!addMealVisible && meals ? (
        <>
          <h2>Meals {todaysDate} </h2>
          <TotalDailyKcal
            allMeals={meals}
            toggleWeekData={() => setWeekDataShown(!weekDataShown)}
            weekDataShown={weekDataShown}
          />
        </>
      ) : null}

      <div className="list-container">
        {!addMealVisible ? (
          <button onClick={toggleAddMealForm}>Add a meal</button>
        ) : null}
        {addMealVisible ? (
          <AddMealModal closeAddMeal={toggleAddMealForm} />
        ) : null}
        {meals ? (
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
        ) : (
          <div>No recent meals</div>
        )}
      </div>
    </div>
  );
};
