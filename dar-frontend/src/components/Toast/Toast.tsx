import { CloseButton } from "..";
import { useHideWithDelay } from "@/hooks/useHideWithDelay";

export const Toast = ({
  text,
  success = true,
}: {
  text: string;
  success?: boolean;
}) => {
  const { isVisible, hide } = useHideWithDelay();
  return (
    <>
      <div
        className={`${success ? "success" : "error"} ${
          isVisible ? "toast" : "hidden"
        }`}>
        {text}
        <CloseButton onClick={hide} />
      </div>
    </>
  );
};
