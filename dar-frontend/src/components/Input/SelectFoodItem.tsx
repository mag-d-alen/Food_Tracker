import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { FoodItem } from "../../app/types";
import { LoadingToast } from "../Toast/LoadingToast";
import "./Input.css";
type SelectFoodItemProps = {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
  required?: boolean;
};
export const SelectFoodItem: React.FC<SelectFoodItemProps> = ({
  onChange,
  defaultValue = "",
  required = false,
}) => {
  const { data: foodItems, isLoading } = useGetAllFoodItemsQuery({
    refetchOnMountOrArgChange: true,
  });
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e);
  };
  return (
    <div className="input--outer">
      <div className="input--container">
        <label className="input--label">food item</label>
        {isLoading ? (
          <LoadingToast
            isLoading={isLoading}
            isError={false}
            isSuccess={false}
          />
        ) : (
          <select
            required={required}
            className="select"
            onChange={handleSelect}
            defaultValue={defaultValue}
            name="food_item"
          >
            <option value="">--choose item--</option>
            {foodItems &&
              foodItems.map((item: FoodItem) => (
                <option key={item.id} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
};
