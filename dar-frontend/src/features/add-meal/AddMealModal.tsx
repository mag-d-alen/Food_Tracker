import { useEffect, useState } from "react";
import { FoodItem, PartialMeal } from "@/app/types";
import {
  EditableInput,
  Modal,
  Form,
  InputType,
  LoadingToast,
} from "@/components";
import { useAddMealMutation, useUpdateMealMutation } from "@/app/apiSlice";
import { useOpenModal } from "@/hooks";

export const AddMealModal = () => {
  const [createMeal, { data: mealCreated, isSuccess, isError, isLoading }] =
    useAddMealMutation();
  const [editMeal, { isError: isAddError, isLoading: isAddLoading }] =
    useUpdateMealMutation();
  const [meal, setMeal] = useState<PartialMeal>({} as PartialMeal);

  const { openModal, closeAndClear, modalOpen } = useOpenModal();
  const createEmptyMeal = (value: string) => {
    createMeal({ name: value });
  };

  useEffect(() => {
    if (!mealCreated) return;
    if (!mealCreated) throw Error("No meal created");
    //eslint-disable-next-line
    const { total_meal_kcal, ...rest } = Object.assign({}, mealCreated);
    setMeal(rest);
  }, [mealCreated]);

  const submitHandler = (data: { [key: string]: string | number }) => {
    if (data.food_item && typeof data.food_item === "string") {
      const foodItem = JSON.parse(data.food_item) as FoodItem;
      const newItem = {
        food_item: foodItem,
        qty: Number(data.qty),
        meal: meal.id,
        total_kcal: foodItem.kcal ? foodItem.kcal * Number(data.qty) : 0,
      };
      const mealData = { ...meal, food_items: [...meal.food_items, newItem] };
      editMeal(mealData);
      setMeal(mealData);
    }
  };
  const closeModal = () => {
    if (modalOpen) setMeal({} as PartialMeal);
    closeAndClear();
  };

  return (
    <Modal
      modalOpen={modalOpen}
      onClose={closeModal}
      onOpen={openModal}
      title="Add meal"
      triggerText="Add meal"
    >
      <LoadingToast
        isLoading={isLoading || isAddLoading}
        isSuccess={isSuccess}
        isError={isError || isAddError}
      />
      {!modalOpen ? null : (
        <>
          {!meal.name ? (
            <>
              <sub>First, what should the meal be called?</sub>
              <EditableInput
                value={""}
                placeholder="meal name"
                onSubmit={createEmptyMeal}
                saveOnlyOnEnterKey={true}
                label={"name"}
                name="name"
              />
            </>
          ) : (
            <>
              <h2>{meal.name}</h2>
              <Form handleDataSubmit={submitHandler} inputs={getItems()} />
            </>
          )}
        </>
      )}
    </Modal>
  );
};
const getItems = (): InputType[] => {
  return [
    {
      label: "food item",
      placeholder: "food item",
      type: "select",
      value: "",
      name: "food_item",
    },
    {
      label: "quantity",
      placeholder: "qty",
      type: "number",
      value: "",
      name: "qty",
    },
  ];
};
