import { BarGraph } from "../common/BarGraph";
import { MealType } from "../../types";
import { PieChart } from "../common/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { SliceDataType, setPieData } from "../../app/localSlice";

export const DailyBarGraph = ({ data }: { data: MealType[] }) => {
  const dispatch = useDispatch();
  const pieData = useSelector((state: any) => state.pieData.pieData);
  const bucketData = data.map((d: MealType) => {
    return { name: d.name, value: d.total_meal_kcal };
  });
  const maxValue =
    bucketData.sort((a, b) => b.value - a.value)[0]?.value || 100;
  const getPieData = (clickedMeal: { value: number; name: string }) => {
    const foodsArray: SliceDataType[] = [];
    const chosenMealFoods = data.filter((m) => m.name == clickedMeal.name)[0]
      .food_items;
    chosenMealFoods.map((f) =>
      foodsArray.push({
        name: `${Number(f.qty).toPrecision(1)} * ${f.food_item.name}`,
        value: f.total_kcal,
      })
    );
    dispatch(setPieData(foodsArray));
  };
  return (
    <>
      <div className="graphs--graph-container">
        <BarGraph
          bucketData={bucketData}
          domain={bucketData.map((d) => d.name)}
          maxValue={maxValue}
          getBarData={getPieData}
        />
      </div>
      <div className="graphs--graph-container">
        {pieData ? (
          <PieChart />
        ) : (
          <sub>
            {"Click on a day bar to see food stats".toLocaleUpperCase()}
          </sub>
        )}
      </div>
    </>
  );
};
