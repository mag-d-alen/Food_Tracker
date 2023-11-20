import React, { createContext } from "react";
import { ReactNode } from "react";
import { useState } from "react";
export const AddMealContext = createContext({});

export const ModalContext = ({ children }: { children: ReactNode }) => {
  const [addMealVisible, setAddMealVisible] = useState(false);
  const toggleAddMealForm = () => setAddMealVisible(!addMealVisible);
  const value = { addMealVisible, toggleAddMealForm };
  return (
    <AddMealContext.Provider value={value}>{children}</AddMealContext.Provider>
  );
};
