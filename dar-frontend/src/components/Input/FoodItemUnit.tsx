import "./Input.css";

type UnitSelectProps = {
  label: string;
  name: string;
  value?: string;
  type?: "text" | "number" | "password" | "email" | "select";
  required?: boolean;
};
export const UnitSelect: React.FC<UnitSelectProps> = ({
  value = "",
  name = "",
  label,
  required = false,
}) => {
  return (
    <div className="input--outer">
      <div className="input--container">
        <div className="input--label">{label}</div>
        <select
          required={required}
          className="select"
          name={name}
          defaultValue={value}
        >
          <option value="">--choose option--</option>
          <option value="PC">1 piece</option>
          <option value="GR">100 gram</option>
          <option value="ML"> 100 ml</option>
          <option value="C">1 cup</option>
        </select>
      </div>
    </div>
  );
};
