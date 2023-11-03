export const EditableItemName = ({
  name,
  setNewName,
  withLabel = true,
}: {
  name: string;
  setNewName: (name: string) => void;
  withLabel: boolean;
}) => {
  const getPlaceholder = () => (name ? name : "food name");
  return (
    <>
      {withLabel && (
        <label style={{ color: "#7a9f83db" }} htmlFor="calories">
          name
        </label>
      )}
      <input
        placeholder={getPlaceholder()}
        name="name"
        onChange={(e) => setNewName(e.target.value)}
        value={name}
      ></input>
    </>
  );
};
