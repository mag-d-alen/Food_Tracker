import moment from "moment";
import { useSelector } from "react-redux";

export const Header = () => {
  const displayWeek = useSelector((state: any) => state.local.displayWeek);

  const todaysDate = moment().format("DD.MM.YYYY");
  const weekAgo = moment().subtract(7, "days").format("DD.MM.YYYY");
  return (
    <header>
      Meals {displayWeek ? `${weekAgo} - ${todaysDate}` : todaysDate}
    </header>
  );
};
