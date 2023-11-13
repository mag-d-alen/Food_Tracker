// export const foodItemInitialState = {
//   name: "",
//   kcal: 0,
//   unit: "",
//   id: 0,
// };

// export const foodItemReducer = (
//   state = foodItemInitialState,
//   action: { type: string; payload: any }
// ) => {
//   switch (action.type) {
//     case "set-name": {
//       return {
//         ...state,
//         name: action.payload,
//       };
//     }
//     case "set_kcal": {
//       return { ...state, kcal: action.payload };
//     }
//     case "set_unit": {
//       return { ...state, unit: action.payload };
//     }
//     case "set_id":
//       {
//         return {
//           ...state,
//           id: action.payload,
//         };
//       }
//       throw Error("Unknown action: " + action.type);
//   }
// };
