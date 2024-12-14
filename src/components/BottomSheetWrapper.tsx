import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Keyboard, StyleSheet } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import { BottomSheetContent } from "./BottomSheetContent";
import { useBottomSheetContext } from "@hooks/useBottomSheetContext";
import { BottomSheetHeader } from "./BottomSheetHeader";

export const CreateBottomSheetWrapper = () => {
  const { isOpen, handler } = useBottomSheetContext();
  const modalRef = useRef<BottomSheetModal | null>(null);
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.present();
    } else if (!isOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={modalRef}
      onDismiss={() => {
        handler(false);
        Keyboard.dismiss();
      }}
      enableDynamicSizing={true}
      enablePanDownToClose={false}
      handleComponent={BottomSheetHeader}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.1}
          enableTouchThrough={false}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={[
            { backgroundColor: "rgba(0, 0, 0, 1)" },
            StyleSheet.absoluteFillObject,
          ]}
        />
      )}
    >
      <BottomSheetScrollView style={{ flex: 1 }}>
        <BottomSheetContent />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
