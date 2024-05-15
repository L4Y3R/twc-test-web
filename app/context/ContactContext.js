"use client";
import { createContext, useReducer } from "react";

export const ContactContext = createContext();

export const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        contacts: action.payload,
      };
    case "DELETE_CONTACT":
      return {
        contacts: state.contacts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_CONTACT":
      return {
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    default:
      return state;
  }
};

export const ContactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, {
    contacts: null,
  });

  return (
    <ContactContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};
