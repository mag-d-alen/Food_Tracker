import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { setDisplayWeek } from "@/app/displayMealSlice";
import { Button, Header, ToggleButton } from "@/components/";
import { Graphs } from "../graphs";
import { useFetchStatsData } from "../../hooks/useFetchStatsData";

export const Stats = () => {
  const { displayWeek, mealsDisplayed, dailyTotalKcal } =
    useFetchStatsData();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
      {dailyTotalKcal() > 0 ? (
        <Header>
          {displayWeek ? "This week" : "Today"} you've eaten{" "}
          {mealsDisplayed?.length} times
        </Header>
      ) : (
        <>
          <Header> Meals on {moment().format("dddd, DD MMM yyyy")}</Header>
          <div className="col centered">
            <h3>Seems you haven't logged any meals today</h3>
            <sub>check out your weekly stats or start adding food</sub>
          </div>
        </>
      )}
      <ToggleButton
        labelLeft={"today's meals"}
        labelRight={"meals this week"}
        toggleWeekData={() => {
          dispatch(setDisplayWeek(!displayWeek));
        }}
      />
      <div className="col centered">
        <>
          {displayWeek ? "This week's" : "Today's"} total calories count:{" "}
          {dailyTotalKcal()} kcal
        </>
        {dailyTotalKcal() === 0 && (
          <div className="row">
            <Button
              onClick={() => {
                navigate("/my-meals");
              }}>
              Start adding food
            </Button>
          </div>
        )}
      </div>
      {mealsDisplayed.length > 0 && <Graphs displayedMeals={mealsDisplayed} />}
    </>
  );
};
