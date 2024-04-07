import { FoodItem, Meal } from "../../app/types";
import { Form, InputType, Modal } from "@/components";
import { useUpdateMealMutation } from "@/app/apiSlice";
import { useOpenModal } from "@/hooks";

type AddFoodToMealFormProps = {
  meal: Meal;
};
export const AddFoodToMealForm: React.FC<AddFoodToMealFormProps> = ({
  meal,
}) => {
  const [updateMeal] = useUpdateMealMutation();
  const { openModal, closeAndClear, modalOpen } = useOpenModal();

  const submitHandler = (data: {
    [key: string]: string | number | undefined;
  }) => {
    const foodItem =
      typeof data.food_item === "string"
        ? (JSON.parse(data.food_item) as FoodItem)
        : null;
    if (!foodItem) throw Error("Food item data is corrupted");
    const calculatedKcal = foodItem.kcal
      ? Number(foodItem.kcal) * Number(data.qty)
      : 0;
    const newItem = {
      qty: Number(data.qty),
      total_kcal: calculatedKcal,
      food_item: { ...foodItem, kcal: Number(foodItem.kcal) },
      meal: meal.id,
    };
    const updatedFoodItems = meal.food_items.map((item) => {
      //eslint-disable-next-line
      const { total_kcal, ...rest } = Object.assign({}, item);
      return rest;
    });
    //eslint-disable-next-line
    const { total_meal_kcal, ...rest } = Object.assign({}, meal);
    const updatedMeal = {
      ...rest,
      food_items: [...updatedFoodItems, newItem],
    };
    updateMeal(updatedMeal);
    closeAndClear();
  };

  return (
    <Modal
      modalOpen={modalOpen}
      title={"Add food item to your meal"}
      triggerText={"Add Food"}
      triggerVariant={"primary"}
      onOpen={openModal}
      onClose={closeAndClear}
    >
      {modalOpen && (
        <Form handleDataSubmit={submitHandler} inputs={getInputs()} />
      )}
    </Modal>
  );
};
const getInputs = (): InputType[] => {
  return [
    {
      name: "food_item",
      placeholder: "name",
      type: "select",
      value: "",
      label: "food item",
    },
    {
      name: "qty",
      placeholder: "quantity",
      type: "number",
      value: "",
      label: "quantity",
    },
  ];
};
