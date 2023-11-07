import { FoodItemType } from "../../types";
import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const MealCardFoodItemCard = ({
  item,
  deleteFoodItem,
}: {
  item: FoodItemType;
  deleteFoodItem: (id: number) => void;
}) => {
  return (
    <div
      key={item.id}
      style={{
        display: "flex",
        borderBottom: "1px solid #b7b7f7",
        padding: " 0.8rem 1rem 0.3rem 1rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: " 0.8rem 0 0.3rem 0",
        }}
      >
        <div>{item.food_item.name}</div>
        <div>calories: {item.food_item.kcal}</div>
        <div>
          quantity: {item.qty} * {convertUnit(item.food_item.unit)}
        </div>
        <h3>total calories: {item.total_kcal}</h3>
      </div>
      <button
        className="button-close"
        onClick={() => {
          deleteFoodItem(item.id!);
        }}
      >
        x
      </button>
    </div>
  );
};
