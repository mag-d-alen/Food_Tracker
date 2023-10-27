import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { FoodItemCalories } from "../foodItem/FoodItemsCalories";
import { FoodItemUnit } from "../foodItem/FoodItemUnit";
import { LoadingToasts } from "../LoadingToasts";

import { SelectFoodItem } from "./SelectFoodItem";

export const MealFoodItemCardForm = ({
  newKcal,
  newUnit,
  setNewItem,
  handleSubmit,
  closeModal,
  setNewQty,
}: {
  newName: string;
  setNewName?: (name: string) => void;
  setNewItem?: (val: any) => void;
  newKcal?: number;
  setNewKcal?: (kcal: number) => void;
  newUnit: string;
  setNewUnit?: (unit: string) => void;
  newQty?: string;
  setNewQty?: (qty: string) => void;
  handleSubmit: () => void;
  closeModal: () => void;
}) => {
  const { data, isLoading, isError } = useGetAllFoodItemsQuery({
    refetchOnMountOrArgChange: true,
  });
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(3, 89, 40, 0.343)",
        visibility: "visible",
        opacity: 1,
        transition: "visibility 0s, opacity 0.5s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10rem auto",
          width: "fit-content",
          backgroundColor: "white",
          borderRadius: "0.3rem",
          padding: "3rem",
          alignItems: "center",
        }}
      >
        <button
          style={{
            margin: "-2rem -2rem auto auto",
          }}
          onClick={closeModal}
        >
          x
        </button>
        <LoadingToasts
          isLoading={isLoading}
          isError={isError}
          isSuccess={false}
        />
        {data ? (
          <SelectFoodItem foodItems={data} setNewItem={setNewItem!} />
        ) : null}

        <FoodItemCalories kcal={newKcal} unit={newUnit} canEdit={false} />
        <FoodItemUnit
          canEditUnit={false}
          unit={newUnit}
          setNewQty={setNewQty}
        />
        <button onClick={handleSubmit}>save</button>
      </div>
    </div>
  );
};
