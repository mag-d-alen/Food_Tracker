import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),

  endpoints: (builder) => ({
    loginUser: builder.mutation<any, any>({
      query: (body) => ({
        url: "/token/",
        method: "POST",
        body: body,
      }),
    }),
    registerUser: builder.mutation<any, any>({
      query: (body) => ({
        url: "/register/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useLoginUserMutation, useRegisterUserMutation } = authSlice;
