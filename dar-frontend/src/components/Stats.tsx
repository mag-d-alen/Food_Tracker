import { ToggleButton } from "./common/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayWeek, setPieData } from "../app/localSlice";
import { Graphs } from "./graphs/Graphs";
import { MealType } from "../types";

export const Stats = ({ mealsDisplayed }: { mealsDisplayed: MealType[] }) => {
  const displayWeek = useSelector((state: any) => state.local.displayWeek);
  const dispatch = useDispatch();

  const dailyTotalKcal = () =>
    mealsDisplayed.reduce((acc: number, i: any) => acc + i.total_meal_kcal, 0);

  return (
    <>
      <ToggleButton
        labelLeft={"today's meals"}
        labelRight={"meals this week"}
        toggleWeekData={() => {
          dispatch(setDisplayWeek(!displayWeek));
          dispatch(setPieData([]));
        }}
      />
      <div>
        {displayWeek ? "This week's" : "Today's"} eating events count:{" "}
        {mealsDisplayed?.length}
      </div>
      <div>
        {displayWeek ? "This week's" : "Today's"} total calories count:{" "}
        {dailyTotalKcal()} kcal
      </div>
      <Graphs data={mealsDisplayed} />
    </>
  );
};
