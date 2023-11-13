export const extractErrorMessage = (error: any) => {
  return error && "status" in error
    ? "error" in error
      ? error.error
      : JSON.stringify(error.data)
    : error?.message;
};
