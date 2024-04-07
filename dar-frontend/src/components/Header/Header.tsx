import { ReactNode } from "react";
import "./Header.css";
type HeaderProps = {
    children: ReactNode;
}
export const Header: React.FC<HeaderProps> = ({children}) => {
  return <div className="header">{children}</div>;
};
