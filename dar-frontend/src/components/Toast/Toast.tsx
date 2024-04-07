import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const Toast = ({
  text,
  success = true,
}: {
  text: string;
  success?: boolean;
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  })
  return (
    <>
      <div
        className={`${success ? "success" : "error"} ${
          visible ? "toast" : "hidden"
        }`}
      >
        {text}
        <button className="toast-button-close" onClick={() => setVisible(false)}>
          <AiOutlineClose />
        </button>
      </div>
    </>
  );
};
