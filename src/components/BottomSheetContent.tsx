import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { BottleSvg } from "./BottleSvg";

export const BottomSheetContent = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    !keyboardVisible && (
      <BottleSvg />
    )
  );
};
