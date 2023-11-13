import moment from "moment";

export const TotalDailyKcal = ({
  allMeals,
  toggleWeekData,
  weekDataShown,
}: {
  allMeals: any;
  weekDataShown: boolean;
  toggleWeekData: () => void;
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
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
          onClick={toggleWeekData}
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          {weekDataShown ? "Weekly data" : "daily data"}
        </label>
      </div>
      <div>Today's eating events count: {meals.length}</div>
      <div>Today's total calories count: {totalKcal()} kcal</div>
    </>
  );
};
