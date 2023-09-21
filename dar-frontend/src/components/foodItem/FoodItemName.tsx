export const FoodItemName = ({
  name,
  setNewName,
  editable,
}: {
  name: string;
  setNewName: (name: string) => void;
  editable?: boolean;
}) => {
  return (
    <div>
      {editable ? (
        <>
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={name}></input>
        </>
      ) : (
        <div>{name}</div>
      )}
    </div>
  );
};
