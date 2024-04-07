import "./Form.css";
import { Button } from "../Button";

type FormPropsTypes = {
  handleDataSubmit: (data: FormData) => void;
  children: React.ReactNode;
};
export const AuthForm: React.FC<FormPropsTypes> = ({
  handleDataSubmit,
  children,
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(data.entries());
    handleDataSubmit(formData as unknown as FormData);
  };
  return (
    <>
      <form className="form" method="post" onSubmit={(e) => onSubmit(e)}>
        {children}
        <Button type="submit">submit</Button>
      </form>
    </>
  );
};
