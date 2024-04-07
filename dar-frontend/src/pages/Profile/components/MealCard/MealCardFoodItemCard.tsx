import { Meal, MealFoodItem } from "@/app/types";
import { convertUnit } from "@/utils/unitMeasuresConvertor";
import { useUpdateMealMutation } from "@/app/apiSlice";
import { AiOutlineClose } from "react-icons/ai";

export const MealCardFoodItemCard = ({
  item,
  meal,
}: {
  item: MealFoodItem;
  meal: Meal;
}) => {
  const [saveChanges] = useUpdateMealMutation();
  const deleteFoodItem = (id: number) => {
    const updatedFoodItems = meal.food_items.filter(
      (item: MealFoodItem) => item.id != id
    );
    saveChanges({ ...meal, food_items: updatedFoodItems });
  };

  return (
    <div key={item.id} className="card__food-item--container">
      <div className="card__food-item">
        <h3>
          {item.food_item.name.toLocaleUpperCase()}
        </h3>
        <div>calories: {item.food_item.kcal}</div>
        <div>
          quantity: {item.qty} * {convertUnit(item.food_item.unit)}
        </div>
        <h3>total: {item.total_kcal} kcal</h3>
      </div>
      <button
        className="button-close"
        onClick={() => {
          deleteFoodItem(item.id!);
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};
