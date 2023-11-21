import moment from "moment";
import { ReactNode } from "react";
import { ToggleButton } from "./common/ToggleButton";

export const Stats = ({
  allMeals,
  toggleWeekData,
  weekDataShown,
  children,
}: {
  allMeals: any;
  weekDataShown: boolean;
  toggleWeekData: () => void;
  children: ReactNode;
}) => {
  const meals = allMeals.filter((meal: { created_at: moment.MomentInput }) => {
    return moment(meal.created_at).isBetween(
      weekDataShown
        ? moment().subtract(7, "days")
        : moment().subtract(24, "hours"),
      moment()
    );
  });
  const daylyTotalKcal = () =>
    meals.reduce((acc: number, i: any) => acc + i.total_meal_kcal, 0);

  return (
    <>
      <ToggleButton
        labelLeft={"today's meals"}
        labelRight={"meals this week"}
        toggleWeekData={toggleWeekData}
      />
      <div>
        {weekDataShown ? "This week's" : "Today's"} eating events count:{" "}
        {meals.length}
      </div>
      <div>
        {weekDataShown ? "This week's" : "Today's"} total calories count:{" "}
        {daylyTotalKcal()} kcal
      </div>
      <div className="graphs-container">{children}</div>
    </>
  );
};
