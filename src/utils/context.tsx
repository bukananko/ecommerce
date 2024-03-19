import type { Product } from "@/types";
import { createContext, useState } from "react";

type ReplyType = {
  active: boolean;
  ref: string;
};

type SelectedCartItemType = Product & { selected: boolean; qty: number };

type ContextType = {
  reply: ReplyType;
  setReply: React.Dispatch<React.SetStateAction<ReplyType>>;
  selectedCart: SelectedCartItemType[];
  setSelectedCart: React.Dispatch<React.SetStateAction<SelectedCartItemType[]>>;
};

export const GlobalContext = createContext({} as ContextType);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [reply, setReply] = useState<ReplyType>({
    active: false,
    ref: "",
  });

  const [selectedCart, setSelectedCart] = useState<SelectedCartItemType[]>([]);

  return (
    <GlobalContext.Provider
      value={{ reply, setReply, selectedCart, setSelectedCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
