import { AiOutlineClose } from "react-icons/ai";
import "../Button/Button.css";
type CloseButtonProps = {
  onClick: () => void;
};
export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className="button-close" onClick={onClick}>
      <AiOutlineClose />
    </button>
  );
};
