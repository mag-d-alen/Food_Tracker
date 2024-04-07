import "./PageWrapper.css";
import Navbar from "./components/Navbar";

type PageWrapperProps = {
  children: React.ReactNode;
};
export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};
