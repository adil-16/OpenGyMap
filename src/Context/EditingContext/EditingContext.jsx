// EditingContext.js
import React, { createContext, useState, useContext } from "react";

const EditingContext = createContext();

export const useEditing = () => useContext(EditingContext);

export const EditingProvider = ({ children }) => {
  const [editingLabel, setEditingLabel] = useState(null);

  const startEditing = (label) => setEditingLabel(label);
  const stopEditing = () => setEditingLabel(null);

  return (
    <EditingContext.Provider value={{ editingLabel, startEditing, stopEditing }}>
      {children}
    </EditingContext.Provider>
  );
};
