import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Header } from "@/components";

export const MealsHeader = () => {
  const displayWeek = useSelector(
    (state: RootState) => state.displayMealSlice.displayWeek
  );

  const todaysDate = moment().format("DD.MM.YYYY");
  const weekAgo = moment().subtract(7, "days").format("DD.MM.YYYY");
  return (
    <Header>
      Meals {displayWeek ? `${weekAgo} - ${todaysDate}` : todaysDate}
    </Header>
  );
};
