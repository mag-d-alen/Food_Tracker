import { useState } from "react";

export const Toast = ({
  text,
  success = true,
}: {
  text: string;
  success?: boolean;
}) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div
        style={{
          padding: "1rem",
          backgroundColor: success ? "#00800040" : "pink",
          borderRadius: "0.3rem",
          display: visible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
              {text} <button style={{padding: "0.3rem 0.6rem", margin:'0', color:"white", backgroundColor:"inherit"}} onClick={() => setVisible(false)}>x</button>
      </div>
    </>
  );
};
