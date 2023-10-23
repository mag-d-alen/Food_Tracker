export const MealCardDate = ({ detail }: { detail: string }) => {
  return (
    <h3>
      {detail.split(" ")[0]}{" "}
      <span style={{ fontSize: "2.2rem" }}>{detail.split(" ")[1]} </span>
    </h3>
  );
};
