import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { MealFoodItem, Meal } from "@/app/types";
import { DATE_FORMAT } from "@/app/constants";
import { PieData } from "@/app/displayMealSlice";
import { RootState } from "@/app/store";
import { BarGraph } from "./BarGraph";
import { PieChart } from "../chart";
import "../../Home.css";

type GraphsProps = {
  displayedMeals: Meal[];
};
type BucketData = {
  name: string;
  value: number;
};
export const Graphs: React.FC<GraphsProps> = ({ displayedMeals }) => {
  const { displayWeek } = useSelector(
    (state: RootState) => state.displayMealSlice
  );
  const [pieData, setPieData] = useState([] as PieData[]);
  const [pieTitle, setPieTitle] = useState("");

  const bucketData = displayedMeals.map((meal: Meal) => {
    return displayWeek
      ? {
          name: moment(meal.created_at).format(DATE_FORMAT),
          value: meal.total_meal_kcal,
        }
      : { name: meal.name, value: meal.total_meal_kcal };
  });
  const maxXAxisValue =
    bucketData.sort((a, b) => b.value - a.value)[0].value || 100;

  const mealDays = Array.from(
    new Set(
      displayedMeals.map((d: Meal) => moment(d.created_at).format(DATE_FORMAT))
    )
  );
  const mealNames = bucketData.map((d: BucketData) => d.name);
  const domain = displayWeek ? mealDays : mealNames;

  const getBarData = (clickedBar: { value: number; name: string }) => {
    const barDataToPie: PieData[] = [] as PieData[];
    const barToPie = () => {
      if (displayWeek) {
        setPieTitle(`Meals on ${clickedBar.name}`);
        const weeklyMeals: Meal[] = displayedMeals.filter(
          (meal: Meal) =>
            moment(meal.created_at).format(DATE_FORMAT) == clickedBar.name
        );
        weeklyMeals.map((meal: Meal) =>
          meal.food_items.map((food: MealFoodItem) =>
            barDataToPie.push({
              name: food.food_item.name.toUpperCase(),
              value: Number(food.food_item.kcal) || 0,
            })
          )
        );
      } else {
        setPieTitle(`Breakdown of today's ${clickedBar.name}`);
        const food = displayedMeals.filter(
          (meal: Meal) => meal.name == clickedBar.name
        )[0].food_items;
        food.map((food: MealFoodItem) =>
          barDataToPie.push({
            name: food.food_item.name,
            value: food.total_kcal,
          })
        );
      }
      setPieData(barDataToPie);
    };
    barToPie();
  };

  return (
    <div className="graphs-container">
      <div className="graphs--graph-container">
        <BarGraph
          bucketData={bucketData}
          maxValue={maxXAxisValue}
          domain={domain}
          getBarData={getBarData}
        />
      </div>
      <div className="graphs--graph-container">
        <PieChart pieData={pieData} pieTitle={pieTitle} />
      </div>
    </div>
  );
};
