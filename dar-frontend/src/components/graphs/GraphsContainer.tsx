import { MARGIN } from "../../app/constants";
import { MealType } from "../../types";
import { DailyBarGraph } from "./DailyBarGraph";
import { WeeklyBarGraph } from "./WeeklyBarGraph";

export const GraphsContainer = ({
  weekDataShown,
  data,
}: {
  weekDataShown: boolean;
  data: MealType[];
}) => {
  return (
    <div className="row centered">
      {weekDataShown ? (
        <WeeklyBarGraph data={data} />
      ) : (
        <DailyBarGraph data={data} />
      )}
    </div>
  );
};
