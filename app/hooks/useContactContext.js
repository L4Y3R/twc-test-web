import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

export const useContactContext = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw Error(
      "UseContactContext must be used inside a ContactContextProvider"
    );
  }

  return context;
};
