import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { FoodItemName } from "./FoodItemName";
import { FoodItemUnit } from "./FoodItemUnit";
import { FoodItemCalories } from "./FoodItemsCalories";

export const FoodItemCardForm = ({
  newName,
  setNewName,
  newKcal,
  setNewKcal,
  newUnit,
  setNewUnit,
  handleSubmit,
  closeModal,
}: {
  newName: string;
  setNewName: (name: string) => void;
  newKcal?: number;
  setNewKcal: (kcal: number) => void;
  newUnit: string;
  setNewUnit: (unit: string) => void;
  handleSubmit: () => void;
  closeModal: () => void;
}) => {
  const { data, isLoading } = useGetAllFoodItemsQuery({
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
        {isLoading ? <div>loading....</div> : null}
        <FoodItemName name={newName!} setNewName={setNewName!} />
        <FoodItemCalories
          kcal={newKcal}
          unit={newUnit}
          setNewKcal={setNewKcal}
        />
        <FoodItemUnit unit={newUnit} setNewUnit={setNewUnit} />
        <button onClick={handleSubmit}>save</button>
      </div>
    </div>
  );
};
