import { useBottomSheetContext } from "@hooks/useBottomSheetContext";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import BottleIcon from "@icons/smallBottle.svg";
import KeyboardIcon from "@icons/keyboard.svg";

export const BottomSheetHeader = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const { handler, inputRef } = useBottomSheetContext();

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

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      if (!isPressed) {
        console.log("Keyboard hidden, and no press detected.");
        handler(false);
        Keyboard.dismiss();
      }
    });

    if (isPressed) {
      Keyboard.dismiss();
    } else if (!isPressed) {
      inputRef?.current?.focus();
    }

    return () => {
      hideSubscription.remove();
    };
  }, [isPressed]);
  return (
    <Pressable
      style={styles.header}
      onPress={() => {
        setIsPressed((old) => !old);
      }}
    >
      {keyboardVisible ? (
        <BottleIcon width={64} height={64} />
      ) : (
        <KeyboardIcon />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: "auto",
  },
});
