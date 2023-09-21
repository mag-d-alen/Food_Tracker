

export const AddMealModal = ({
  closeAddMeal,
}: {
  closeAddMeal: () => void;
}) => {
  return (
    <div>
      AddMealModal
      <button onClick={closeAddMeal}>close</button>
    </div>
  );
};
