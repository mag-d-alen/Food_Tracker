import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["User"],
  refetchOnMountOrArgChange: true,
 
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/token/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/register/",
        method: "POST",
        body: body,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/token/",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  keepUnusedDataFor: 360,
});
export const { useLoginUserMutation, useRegisterUserMutation } = authSlice;
