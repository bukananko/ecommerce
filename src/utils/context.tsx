import { createContext, useState } from "react";

type ReplyType = {
  active: boolean;
  ref: string;
};

type ContextType = {
  reply: ReplyType;
  setReply: React.Dispatch<React.SetStateAction<ReplyType>>;
};

export const GlobalContext = createContext({} as ContextType);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [reply, setReply] = useState<ReplyType>({
    active: false,
    ref: "",
  });

  return (
    <GlobalContext.Provider value={{ reply, setReply }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
