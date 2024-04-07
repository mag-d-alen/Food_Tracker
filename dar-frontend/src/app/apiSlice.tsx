import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Meal, FoodItem } from "./types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers: Headers) => {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }
    },
  }),
  tagTypes: ["FoodItem", "Meal"],
  endpoints: (builder) => ({
    getAllFoodItems: builder.query({
      query: () => `/fooditems`,
      providesTags: ["FoodItem"],
    }),

    getFoodItem: builder.query<FoodItem, number>({
      query: (id: number) => `/fooditems/${id}/`,
    }),

    updateFoodItem: builder.mutation<FoodItem, Partial<FoodItem>>({
      query: (body) => ({
        url: `/fooditems/${body.id}/`,
        method: "PATCH",
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: body,
      }),
      invalidatesTags: ["FoodItem"],
    }),

    addFoodItem: builder.mutation<void, Partial<FoodItem>>({
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

    getAllMeals: builder.query({
      query: () => `/meals`,
      providesTags: ["Meal"],
    }),

    getMeal: builder.query<Meal, number>({
      query: (id: number) => ({ url: `/meals/${id}/`, providesTags: ["Meal"] }),
    }),

    updateMeal: builder.mutation<void, unknown>({
      query: (body: Meal) => ({
        url: `/meals/${body.id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Meal"],
    }),

    addMeal: builder.mutation<Meal, Partial<Meal>>({
      query: (body: Meal) => ({
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
  useGetMealQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = apiSlice;
