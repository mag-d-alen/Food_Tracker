import { useState } from "react";
export const useOpenModal = () => {
  const [hideContent, setHideContent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeAndClear = () => {
    setTimeout(() => setHideContent(true), 850);
    setModalOpen(false);
  };
  const openModal = () => {
    setHideContent(false);
    setModalOpen(true);
  };
  return { hideContent, openModal, closeAndClear, modalOpen };
};
