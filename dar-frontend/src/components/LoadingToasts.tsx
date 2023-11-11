import { Toast } from "./Toast";

export const LoadingToasts = ({
  isLoading,
  isError,
  isSuccess,
  message,
}: {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
}) => {
  return (
    <div className="toast--container">
      {isLoading ? (
        <Toast text={message || "saving your changes..."} success={isSuccess} />
      ) : null}
      {isError ? (
        <Toast
          text={message || "An unexpected error occured, try again, please..."}
          success={!isError}
        />
      ) : null}
      {isSuccess ? (
        <Toast
          text={message || "Changes saved successfully"}
          success={isSuccess}
        />
      ) : null}
    </div>
  );
};
