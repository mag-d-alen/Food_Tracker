import { BarGraph } from "../common/BarGraph";
import { MealType } from "../../types";
import moment from "moment";
import { DATE_FORMAT, HEIGHT, WIDTH } from "../../app/constants";
import { PieChart } from "./PieChart";
import { useState } from "react";

export const WeeklyBarGraph = ({ data }: { data: MealType[] }) => {
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);
  const bucketData = data.map((d: MealType) => {
    return {
      name: moment(d.created_at).format(DATE_FORMAT),
      value: d.total_meal_kcal,
    };
  });
  const maxValue = bucketData.sort((a, b) => b.value - a.value)[0].value;
  const mealDays = Array.from(
    new Set(data.map((d) => moment(d.created_at).format(DATE_FORMAT)))
  );
  const findDay = (clickedDay: { value: number; name: string }) => {
    const dayToPie = data.filter(
      (d) => moment(d.created_at).format(DATE_FORMAT) == clickedDay.name
    );
    const pieData: { name: string; value: number }[] = [];
    dayToPie.map((d) =>
      d.food_items.forEach((food) =>
        pieData.push({
          name: food.food_item.name,
          value: food.total_kcal,
        })
      )
    );
    setPieData(pieData);
  };

  return (
    <>
      <BarGraph
        bucketData={bucketData}
        maxValue={maxValue}
        domain={mealDays}
        getBarData={findDay}
      />
      {pieData.length ? (
        <PieChart data={pieData} />
      ) : (
        <sub>{"Click on a day bar to see food stats".toLocaleUpperCase()}</sub>
      )}
    </>
  );
};
