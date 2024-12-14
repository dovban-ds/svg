import { useBottomSheetContext } from "@hooks/useBottomSheetContext";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export const CustomInput = () => {
  const { handler, inputRef, text, setText, setLastYCoord, lastYCoord } =
    useBottomSheetContext();

  return (
    <View style={{ flex: 1, paddingHorizontal: 75, marginTop: 75 }}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onPress={() => {
          handler(true);
        }}
        onSubmitEditing={(e) => {
          e.preventDefault();
          handler(false);
          setText(`0.00`);
        }}
        onChangeText={(e) => {
          let input = e;
          setText(`${input}`);
        }}
        onBlur={(e) => {
          e.preventDefault();

          const inputNumber = +text;

          if (Number.isNaN(inputNumber) || inputNumber < 0) {
            setText(`0.00`);
            setLastYCoord(259 - (259 * 0) / 100);
            return;
          }

          if (inputNumber > 1) {
            setText(`1.00`);
            setLastYCoord(259 - (259 * 100) / 100);
            return;
          }

          setText(inputNumber.toFixed(2));
          setLastYCoord(259 - 259 * inputNumber);
          return;
        }}
        keyboardType="number-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginTop: 100,
  },
});
