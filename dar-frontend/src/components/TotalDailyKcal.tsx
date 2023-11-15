import moment from "moment";
import { ReactNode } from "react";

export const TotalDailyKcal = ({
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
  const totalKcal = () =>
    meals.reduce((acc: number, i: any) => acc + i.total_meal_kcal, 0);

  return (
    <>
      <div className="toggle-container row">
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          daily data
        </label>
        <div className="toggle-switch">
          <input
            type="checkbox"
            className="toggle-switch-checkbox"
            name="toggleSwitch"
            id="toggleSwitch"
            onClick={toggleWeekData}
          />
        </div>
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          weekly data
        </label>
      </div>
      <div>Today's eating events count: {meals.length}</div>
      <div>Today's total calories count: {totalKcal()} kcal</div>
      {children}
    </>
  );
};
