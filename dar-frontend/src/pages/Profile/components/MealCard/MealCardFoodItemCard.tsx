import { Meal, MealFoodItem } from "@/app/types";
import { convertUnit } from "@/utils/unitMeasuresConvertor";
import { useDeleteMeal } from "../hooks";
import { CloseButton } from "@/components/Button/CloseButton";
type MealCardFoodItemProps = {
  item: MealFoodItem;
  meal: Meal;
};
export const MealCardFoodItem: React.FC<MealCardFoodItemProps> = ({
  item,
  meal,
}) => {
  const { deleteFoodItem } = useDeleteMeal({ id: item.id!, meal: meal });

  return (
    <div key={item.id} className="card__food-item--container">
      <div className="card__food-item">
        <h3>{item.food_item.name.toLocaleUpperCase()}</h3>
        <div>calories: {item.food_item.kcal}</div>
        <div>
          quantity: {item.qty} * {convertUnit(item.food_item.unit)}
        </div>
        <h3>total: {item.total_kcal} kcal</h3>
      </div>
      <CloseButton onClick={deleteFoodItem}></CloseButton>
    </div>
  );
};
