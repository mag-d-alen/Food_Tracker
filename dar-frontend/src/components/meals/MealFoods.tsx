import React from "react";
import { FoodItemInputType, FoodItemType } from "../../types";
import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const MealFoods = ({ item }: { item: FoodItemType }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottom: "1px solid darkgreen",
        padding: " 0.8rem 0 0.3rem 0",
      }}>
      <div>{item.name}</div>
      <div>{item.kcal} kcal</div>
      <div>{convertUnit(item.unit)}</div>
    </div>
  );
};
