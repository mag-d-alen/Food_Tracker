// import { SingleFoodItemType } from "../../types";
// import { useDeleteFoodItemMutation } from "../../app/apiSlice";

// import { convertUnit } from "../../utils/unitMeasuresConvertor";

// export const MealFoodItemCard = ({
//   item,
// }: {
//   item: SingleFoodItemType;
// }): JSX.Element => {
//   const { id, name, kcal, unit } = { ...item };
//   const [deleteFoodItem] = useDeleteFoodItemMutation();

//   return (
//     <div
//       style={{
//         padding: "1rem",
//         border: "1px solid lightgray",
//         borderRadius: "0.3rem",
//         margin: "1rem",
//         display: "flex",
//         width: "25rem",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <h3>{name.toLocaleUpperCase()}</h3>
//       <h4>
//         {kcal} kcal per {convertUnit(unit)}
//       </h4>

//       <button onClick={() => deleteFoodItem(id)}>Remove Item</button>
//     </div>
//   );
// };
