import moment from "moment";

export const TotalDailyKcal = ({ allMeals }: { allMeals: any }) => {
    console.log(allMeals)
  const todaysMeals = allMeals.filter(
    (meal: { created_at: moment.MomentInput }) =>
      moment(meal.created_at).isSame(moment(), "day")
  );
    const totalKcal = allMeals.reduce((acc:number, i:any)=>acc+i.total_meal_kcal, 0)
  return (
    <>
      <div>Today's eating events count: {todaysMeals.length}</div>
          <div>Today's total calories count: {totalKcal} kcal</div>
    </>
  );
};
