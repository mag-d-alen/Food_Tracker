import { BarGraph } from "../common/BarGraph";
import { MealType } from "../../types";
import { PieChart } from "./PieChart";
import { SetStateAction, useState } from "react";

export const DailyBarGraph = ({ data }: { data: MealType[] }) => {
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);
  const bucketData = data.map((d: MealType) => {
    return { name: d.name, value: d.total_meal_kcal };
  });
  const maxValue =
    bucketData.sort((a, b) => b.value - a.value)[0]?.value || 100;
  const getPieData = (clickedMeal: { value: number; name: string }) => {
    const foodsArray: SetStateAction<{ name: string; value: number }[]> = [];
    const chosenMealFoods = data.filter((m) => m.name == clickedMeal.name)[0]
      .food_items;
    chosenMealFoods.map((f) =>
      foodsArray.push({
        name: `${Number(f.qty).toPrecision(1)} * ${f.food_item.name}`,
        value: f.total_kcal,
      })
    );
    setPieData(foodsArray);
  };
  return (
    <>
      <BarGraph
        bucketData={bucketData}
        domain={bucketData.map((d) => d.name)}
        maxValue={maxValue}
        getBarData={getPieData}
      />
      {pieData.length ? (
        <PieChart data={pieData} />
      ) : (
        <sub>{"Click on a day bar to see food stats".toLocaleUpperCase()}</sub>
      )}
    </>
  );
};
