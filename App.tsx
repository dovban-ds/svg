import React from "react";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { CreateBottomSheetWrapper } from "@components/BottomSheetWrapper";
import { BottomSheetProvider } from "@context/BottomSheetContext";
import { CustomInput } from "@components/CustomInput";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#f4dbff" }}>
      <BottomSheetProvider>
        <StatusBar />
        <CustomInput />
        <BottomSheetModalProvider>
          <CreateBottomSheetWrapper />
        </BottomSheetModalProvider>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
};

export default App;
