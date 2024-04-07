import { Toast } from ".";
import "./Toast.css";

export const LoadingToast = ({
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
        <Toast text={message || "give me a moment..."} success={true} />
      ) : null}
      {isError ? (
        <Toast
          text={message || "An error occurred while saving your changes"}
          success={false}
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
