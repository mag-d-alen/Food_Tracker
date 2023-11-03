import Select, { SingleValue } from "react-select";
import { OptionType, OptionsType } from "../../types";

export const CustomSelect = ({
  options,
  handleChange,
}: {
  options: OptionsType;
  handleChange: (option: OptionType) => void;
}) => {
  return (
    <Select
      options={options}
      onChange={(option: SingleValue<OptionType>) => {
        if (option === null) return;
        handleChange(option);
      }}
    />
  );
};
