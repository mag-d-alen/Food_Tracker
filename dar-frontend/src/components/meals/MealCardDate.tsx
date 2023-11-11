import moment from "moment";

export const MealCardDate = ({ detail }: { detail: string }) => {
  const date = moment(detail).format("DD.MM.YYYY HH:mm");
  return (
    <h3>
      {date.split(" ")[0]}{" "}
      <span style={{ fontSize: "2.2rem" }}>{date.split(" ")[1]} </span>
    </h3>
  );
};
