// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FoodItemType } from "../types";

export const foodItemsSlice = createApi({
  reducerPath: "foodItemsSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["FoodItem"],
  endpoints: (builder) => ({
    getAllFoodItems: builder.query({
      query: () => `/fooditems`,
      providesTags: ["FoodItem"],
    }),

    getFoodItem: builder.query<FoodItemType, number>({
      query: (id: number) => `/fooditems/${id}/`,
    }),

    updateFoodItem: builder.mutation<FoodItemType, Partial<FoodItemType>>({
      query: (data) => ({
        url: `/fooditems/${data.id}/`,
        method: "PATCH",
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: { ...data },
      }),
      invalidatesTags: ["FoodItem"],
    }),
    addFoodItem: builder.mutation<void, any>({
      query: ({ body }: { body: FoodItemType }) => ({
        url: "/fooditems/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["FoodItem"],
    }),
    deleteFoodItem: builder.mutation({
      query: (id) => ({
        url: `/fooditems/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodItem"],
    }),
  }),
});
export const {
  useGetAllFoodItemsQuery,
  useGetFoodItemQuery,
  useAddFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
} = foodItemsSlice;
