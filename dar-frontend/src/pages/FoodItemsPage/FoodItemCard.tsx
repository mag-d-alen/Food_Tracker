import { FoodItem } from "@/app/types";
import { convertUnit } from "@/utils/unitMeasuresConvertor";
import {
  useDeleteFoodItemMutation,
  useUpdateFoodItemMutation,
} from "@/app/apiSlice";
import { LoadingToast, Button } from "@/components";
import { FoodItemForm } from "@/features/handle-food-item";

export const FoodItemCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const { id, name, kcal, unit } = { ...item };
  const [deleteFoodItem] = useDeleteFoodItemMutation();
  const [updateFoodItem, { isSuccess, isError, isLoading }] =
    useUpdateFoodItemMutation();
  const removeItem = () => {
    if (!id) return;
    deleteFoodItem(id!);
  };

  const handleSubmit = ({
    name,
    kcal,
    unit,
  }: {
    name?: string;
    kcal?: number;
    unit?: string;
  }) => {
    const updatedItem = {
      name: name || item.name,
      kcal: kcal || item.kcal,
      unit: unit || item.unit,
      id: item.id,
    };
    return updateFoodItem(updatedItem);
  };

  return (
    <div className="food-items__card">
      <h3>{name.toLocaleUpperCase()}</h3>
      <h4>
        {kcal} kcal per {convertUnit(unit)}
      </h4>
      <div className="food-items__card--buttons">
        <FoodItemForm item={item} onSubmit={handleSubmit} />
        <LoadingToast
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
        <Button variant="secondary" onClick={removeItem}>
          Remove Item
        </Button>
      </div>
    </div>
  );
};
