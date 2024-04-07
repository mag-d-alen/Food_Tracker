import { ReactNode } from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "..";
type ModalProps = {
  children: React.ReactNode;
  title: ReactNode;
  triggerText: string;
  triggerVariant?: "primary" | "secondary";
  modalOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};
export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  triggerText,
  triggerVariant = "primary",
  onClose,
  onOpen,
  modalOpen = false,
}) => {
  return (
    <>
      <Button variant={triggerVariant} onClick={onOpen} disabled={modalOpen}>
        {triggerText}
      </Button>
      <div className={`modal--wrapper ${!modalOpen && "inactive"}`}>
        <div className="modal--container">
          <button className="button-close" onClick={onClose}>
            <AiOutlineClose />
          </button>
          <h2 className="modal--title">{title}</h2>
          <div className="modal--content">{children}</div>
          <div className="modal--button"></div>
        </div>
      </div>
    </>
  );
};
