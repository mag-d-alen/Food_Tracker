import "./Card.css";

type CardProps = {
  children: React.ReactNode;
  title: React.ReactNode;
};
export const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="card-container">
      <h3>{title}</h3>
      {children}
    </div>
  );
};
