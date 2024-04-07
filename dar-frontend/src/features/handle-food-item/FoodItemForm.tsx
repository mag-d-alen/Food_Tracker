import { Form, InputType, Modal } from "@/components";
import { FoodItem } from "@/app/types";
import { useOpenModal } from "@/hooks";

type FoodItemFormProps = {
  item?: FoodItem;
  onSubmit: ({
    name,
    kcal,
    unit,
  }: {
    name?: string;
    kcal?: number;
    unit?: string;
  }) => void;
  items?: InputType[];
  editMode?: boolean;
};
export const FoodItemForm: React.FC<FoodItemFormProps> = ({
  item,
  onSubmit,
  items,
  editMode = true,
}) => {
  const { hideContent, openModal, closeAndClear, modalOpen } = useOpenModal();

  const submitAndCloseModal = (data: {
    [key: string]: string | number | undefined;
  }) => {
    onSubmit(data);
    closeAndClear();
  };

  return (
    <Modal
      modalOpen={modalOpen}
      onOpen={openModal}
      onClose={closeAndClear}
      title={editMode ? "Edit food item" : "Add food item"}
      triggerText={editMode ? "edit item" : "add item"}
      triggerVariant={editMode ?  "secondary": "primary"}
    >
      {!hideContent && (
        <Form
          handleDataSubmit={submitAndCloseModal}
          inputs={items ?? getInputs(item)}
          editMode={!!item}
        />
      )}
    </Modal>
  );
};
const getInputs = (item: FoodItem | undefined): InputType[] => {
  return [
    {
      label: "name",
      placeholder: item?.name || "name",
      type: "text",
      value: item?.name || "",
      name: "name",
    },
    {
      label: "kcal",
      placeholder: item?.kcal?.toString() || "kcal",
      type: "number",
      value: "",
      name: "kcal",
    },
    {
      label: "unit",
      placeholder: item?.unit ?? "unit",
      type: "select",
      value: item?.unit || "",
      name: "unit",
    },
  ];
};
