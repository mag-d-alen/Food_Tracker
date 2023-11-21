import { BarGraph } from "../common/BarGraph";
import { MealType } from "../../types";
import moment from "moment";
import { DATE_FORMAT } from "../../app/constants";
import { PieChart } from "../common/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { SliceDataType, setPieData } from "../../app/localSlice";

export const WeeklyBarGraph = ({ data }: { data: MealType[] }) => {
  const dispatch = useDispatch();
  const pieData = useSelector((state: any) => state.pieData.pieData);

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

    let pieData: SliceDataType[] = [];
    dayToPie.map((d) =>
      d.food_items.forEach((food) =>
        pieData.push({
          name: food.food_item.name,
          value: food.total_kcal,
        })
      )
    );
    dispatch(setPieData(pieData));
  };

  return (
    <>
      <div className="graphs--graph-container">
        <BarGraph
          bucketData={bucketData}
          maxValue={maxValue}
          domain={mealDays}
          getBarData={findDay}
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
