import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { TextInput } from "react-native";

export const BottomSheetContext = createContext({
  isOpen: false,
  handler: (status: boolean): void => {},
  inputRef: null,
  text: "",
  lastYCoord: 259,
  setText: (() => {}) as Dispatch<SetStateAction<string>>,
  setLastYCoord: (() => {}) as Dispatch<SetStateAction<number>>,
  getLastYCoord: (): number => {
    return 259;
  },
});

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<MutableRefObject<TextInput | null> | null>(null);
  const [text, setText] = useState("");
  const [lastYCoord, setLastYCoord] = useState(259);

  const getLastYCoord = (): number => {
    return lastYCoord;
  };

  return (
    <BottomSheetContext.Provider
      value={{
        isOpen,
        handler: (newStatus) => {
          setIsOpen(newStatus);
        },
        inputRef,
        text,
        setText,
        lastYCoord,
        setLastYCoord,
        getLastYCoord,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
