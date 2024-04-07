import { PageWrapper } from "../PageWrapper/PageWrapper";
import { LoadingToast } from "../../components/Toast/LoadingToast";
import {
  useAddFoodItemMutation,
  useGetAllFoodItemsQuery,
} from "../../app/apiSlice";
import { FoodItemForm } from "../../features/handle-food-item/FoodItemForm";
import { FoodItem } from "../../app/types";
import { FoodItemCard } from "./FoodItemCard";
import "./FoodItems.css";
import { useMemo } from "react";
import { Header } from "@/components";
export const FoodItemsPage = () => {
  const {
    data: foodItems,
    isLoading,
    isError,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });
  const [
    addFoodItem,
    { isSuccess: isAddSuccess, isError: isAddError, isLoading: isAddLoading },
  ] = useAddFoodItemMutation();

  const handleSubmit = ({
    name,
    kcal,
    unit,
  }: {
    name?: string;
    kcal?: number;
    unit?: string;
  }) => {
    addFoodItem({ name, kcal, unit });
  };
  const cardList = useMemo(
    () =>
      foodItems &&
      foodItems.map((item: JSX.IntrinsicAttributes & FoodItem) => (
        <FoodItemCard item={item} key={item.id} />
      )),
    [foodItems]
  );
  return (
    <PageWrapper>
      <div className="col">
        <Header>All Food food items</Header>
        <LoadingToast
          isLoading={isLoading || isAddLoading}
          isError={isError || isAddError}
          isSuccess={isAddSuccess}
        />

        <div className="list-container">
          <FoodItemForm onSubmit={handleSubmit} editMode={false} />
          {foodItems ? <div className="list-scroll">{cardList}</div> : null}
        </div>
      </div>
    </PageWrapper>
  );
};
