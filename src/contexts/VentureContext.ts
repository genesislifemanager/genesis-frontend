import { createContext } from "react";

export type VentureContextType = {
  ventureName: string;
  setVentureName: React.Dispatch<React.SetStateAction<string>>;
};

export const VentureContext = createContext({} as VentureContextType);