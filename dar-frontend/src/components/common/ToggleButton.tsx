import { ReactNode } from "react";

type ToggleProps = {
  toggleWeekData: () => void;
  labelLeft: string | ReactNode;
  labelRight: string | ReactNode;
};
export const ToggleButton = ({
  toggleWeekData,
  labelRight,
  labelLeft,
}: ToggleProps) => {
  return (
    <div className="toggle-container row">
      <label className="toggle-switch-label" htmlFor="toggleSwitch">
        {labelLeft}
      </label>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
          onClick={toggleWeekData}
        />
      </div>
      <label className="toggle-switch-label" htmlFor="toggleSwitch">
        {labelRight}
      </label>
    </div>
  );
};
