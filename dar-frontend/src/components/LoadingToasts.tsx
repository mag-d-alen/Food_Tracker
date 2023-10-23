import { Toast } from "./Toast";

export const LoadingToasts = ({
  isLoading,
  isError,
  isSuccess,
}: {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  return (
    <div>
      {" "}
      {isLoading ? (
        <Toast text={"saving your changes..."} success={isSuccess} />
      ) : null}
      {isError ? (
        <Toast
          text={"An unexpected error occured, try again, please..."}
          success={isError}
        />
      ) : null}
      {isSuccess ? (
        <Toast text={"Changes saved successfully"} success={isSuccess} />
      ) : null}
    </div>
  );
};
