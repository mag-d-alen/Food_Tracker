export const EditableItemName = ({
  name,
  setNewName,
  withLabel = true,
  placeholder = "food name",
}: {
  name: string;
  setNewName: (field: string, value: any) => void;
  withLabel?: boolean;
  placeholder?: string;
}) => {
  const getPlaceholder = () => (name ? name : placeholder);

  return (
    <>
      {withLabel && <label style={{ color: "#7a9f83db" }}>name</label>}
      <input
        placeholder={getPlaceholder()}
        name="name"
        onChange={(e) => {
          setNewName("name", e.target.value);
        }}
      ></input>
    </>
  );
};
