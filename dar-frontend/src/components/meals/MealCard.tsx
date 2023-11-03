import moment from "moment";
import { MealCardDate } from "./MealCardDate";
import { MealCardFoodItemCard } from "./MealCardFoodItemCard";
import { EditableItemName } from "../common/food_item_card/EditableItemName";

export const MealCard = ({
  isEditing,
  setNewMealName,
  setIsEditing,
  newFoodItems,
  deleteFoodItem,
  newFoodItem,
  addMeal,
  setAddItemVisible,
  created_at,
  totalKcal,
  mealName,
}: {
  isEditing: boolean;
  setNewMealName: (val: string) => void;
  setIsEditing: (val: boolean) => void;
  mealName: string;
  newFoodItems: any;
  deleteFoodItem: (id: number) => void;
  newFoodItem: any;
  addMeal: () => void;
  addItemVisible: boolean;
  setAddItemVisible: (val: boolean) => void;
  setNewFoodItem: (val: any) => void;
  totalKcal: string;
  created_at: string;
}): JSX.Element => {
  return (
    <div className="meals__meal-card">
      <div
        style={{ fontSize: "2rem", padding: "0.5rem 0 0 0" }}
        onClick={() => setIsEditing(true)}
      >
        {isEditing || !mealName.length ? (
          <EditableItemName
            withLabel={false}
            name={mealName}
            setNewName={setNewMealName}
          />
        ) : (
          <span>{mealName.toUpperCase()}</span>
        )}
      </div>

      <MealCardDate detail={moment(created_at).format("DD.MM.YYYY HH:mm")} />

      {newFoodItems ? (
        <>
          {newFoodItems.map((item: any) => (
            <MealCardFoodItemCard
              key={JSON.stringify(item)}
              item={item}
              deleteFoodItem={deleteFoodItem}
            />
          ))}
          {!newFoodItem.name ? <div>total kcal: {totalKcal}</div> : null}
        </>
      ) : (
        <div>No food recorded</div>
      )}

      {newFoodItem.name.length ? (
        <button onClick={addMeal}>save changes</button>
      ) : null}
      <button onClick={() => setAddItemVisible(true)}>Add new Item</button>
    </div>
  );
};
