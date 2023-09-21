export const FoodItemQty = ({
  qty,
  setNewQty,
  editable,
}: {
  qty: number;
  setNewQty: (newQty: number) => void;
  editable: boolean;
}) => {
  return (
    <div>
      {editable ? (
        <input
          onChange={(e) => setNewQty(Number(e.target.value))}
          value={qty}></input>
      ) : (
        <div>Quantity: {qty}</div>
      )}
    </div>
  );
};
