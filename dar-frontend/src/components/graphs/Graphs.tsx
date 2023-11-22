import { BarGraph } from "../common/BarGraph";
import { MealType } from "../../types";
import moment from "moment";
import { DATE_FORMAT } from "../../app/constants";
import { PieChart } from "../common/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { SliceDataType, setPieData } from "../../app/localSlice";

export const Graphs = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const { pieData, displayWeek } = useSelector((state: any) => state.local);

  const bucketData = data.map((d: MealType) => {
    return displayWeek
      ? {
          name: moment(d.created_at).format(DATE_FORMAT),
          value: d.total_meal_kcal,
        }
      : { name: d.name, value: d.total_meal_kcal };
  });
  const maxValue =
    bucketData.sort((a: any, b: any) => b.value - a.value)[0].value || 100;

  const mealDays = Array.from(
    new Set(data.map((d: MealType) => moment(d.created_at).format(DATE_FORMAT)))
  );
  const domain = displayWeek ? mealDays : bucketData.map((d: any) => d.name);

  const getBarData = (clickedBar: { value: number; name: string }) => {
    const pieData: SliceDataType[] = [];
    const barToPie = displayWeek
      ? data.filter(
          (d: MealType) =>
            moment(d.created_at).format(DATE_FORMAT) == clickedBar.name
        )
      : data.filter((m: MealType) => m.name == clickedBar.name)[0].food_items;

    barToPie.map((d: any) => {
      if (displayWeek) {
        d.food_items.forEach((food: any) =>
          pieData.push({
            name: food.food_item.name,
            value: food.total_kcal,
          })
        );
      } else {
        pieData.push({
          name: d.food_item.name,
          value: d.total_kcal,
        });
      }
    });
    dispatch(setPieData(pieData));
  };

  return (
    <div className="graphs-container">
      <div className="graphs--graph-container">
        <BarGraph
          bucketData={bucketData}
          maxValue={maxValue}
          domain={domain}
          getBarData={getBarData}
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
    </div>
  );
};
