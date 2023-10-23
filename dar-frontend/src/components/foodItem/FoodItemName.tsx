export const FoodItemName = ({
  name,
  setNewName,
}: {
  name: string;
  setNewName: (name: string) => void;
}) => {
  const getPlaceholder = () => (name ? name : "food name");
  return (
    <>
      <label style={{ color: "#7a9f83db" }} htmlFor="calories">
        name
      </label>
      <input
        placeholder={getPlaceholder()}
        name="name"
        onChange={(e) => setNewName(e.target.value)}
        value={name}
      ></input>
    </>
  );
};
