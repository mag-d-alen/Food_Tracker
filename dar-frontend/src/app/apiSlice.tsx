// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MealType, SingleFoodItemType } from "../types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["FoodItem", "Meal", "User"],
  endpoints: (builder) => ({
    getAllFoodItems: builder.query({
      query: () => `/fooditems`,
      providesTags: ["FoodItem"],
    }),

    getFoodItem: builder.query<SingleFoodItemType, number>({
      query: (id: number) => `/fooditems/${id}/`,
    }),

    updateFoodItem: builder.mutation<
      SingleFoodItemType,
      Partial<SingleFoodItemType>
    >({
      query: (body) => ({
        url: `/fooditems/${body.id}/`,
        method: "PATCH",
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: body,
      }),
      invalidatesTags: ["FoodItem"],
    }),

    addFoodItem: builder.mutation<void, any>({
      query: (body) => ({
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

    getAllMeals: builder.query<MealType[], any>({
      query: () => `/meals`,
      providesTags: ["Meal"],
    }),

    getMeal: builder.query<MealType, number>({
      query: (id: number) => `/meals/${id}/`,
      providesTags: ["Meal"],
    }),

    updateMeal: builder.mutation<any, any>({
      query: (body: MealType) => ({
        url: `/meals/${body.id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Meal"],
    }),

    addMeal: builder.mutation<void, any>({
      query: (body: MealType) => ({
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

    loginUser: builder.mutation<void, any>({
      query: (body: { username: string; password: string }) => ({
        url: "/login/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
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
  useGetMealQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
  useLoginUserMutation,
} = apiSlice;
