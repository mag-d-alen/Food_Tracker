import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const extractErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (typeof error === "undefined") return "";
  if (typeof error === "string") {
    return error;
  }
  if (
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "detail" in error.data
  ) {
    return error.data.detail as string;
  }
  return "An unexpected error occurred, try again, please try again later";
};
