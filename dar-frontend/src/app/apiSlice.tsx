// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FoodItemType, MealType } from "../types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["FoodItem", "Meal"],
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

    getAllMeals: builder.query({
      query: () => `/meals`,
      providesTags: ["Meal"],
    }),

    getMeal: builder.query<MealType, number>({
      query: (id: number) => `/meals/${id}/`,
    }),

    updateMeal: builder.mutation<MealType, Partial<MealType>>({
      query: (data) => ({
        url: `/meals/${data.id}/`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Meal"],
    }),

    addMeal: builder.mutation<void, any>({
      query: ({ body }: { body: MealType }) => ({
        url: "/meals/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Meal"],
    }),

    deleteMeal: builder.mutation({
      query: (id) => ({
        url: `/meals/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meal"],
    }),
  }),
});
export const {
  useGetAllFoodItemsQuery,
  useGetFoodItemQuery,
  useAddFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
  useAddMealMutation,
  useGetAllMealsQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = apiSlice;
