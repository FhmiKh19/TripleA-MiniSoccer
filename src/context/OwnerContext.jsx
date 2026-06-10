import { createContext, useContext, useState } from "react";
import { fields } from "../data/seeder";

const OwnerContext = createContext(null);

export function OwnerProvider({ children }) {
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || null);

  return (
    <OwnerContext.Provider value={{ selectedFieldId, setSelectedFieldId }}>
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  return useContext(OwnerContext);
}
