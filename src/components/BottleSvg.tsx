import { useBottomSheetContext } from "@hooks/useBottomSheetContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";
import { ClipPath, Defs, Path, Rect, Svg } from "react-native-svg";

export const BottleSvg = () => {
  const { setText, setLastYCoord, getLastYCoord, lastYCoord } =
    useBottomSheetContext();

  const yValue = useMemo(() => {
    const lastY = getLastYCoord();

    if (lastY >= 0 && lastY <= 259) {
      return lastY;
    } else return 259;
  }, [lastYCoord]);

  const pan = useRef(new Animated.ValueXY({ x: 0, y: yValue })).current;

  const [liquidHeight, setLiquidHeight] = useState(getLastYCoord() || 0);
  const [panY, setPanY] = useState(yValue);

  useEffect(() => {
    pan.extractOffset();
  }, []);

  const minY = 0;
  const maxY = 259;

  useEffect(() => {
    const id = pan.addListener((value) => {
      const calc = Math.max(minY, Math.min(maxY, value.y));
      console.log({ calc });
      setPanY(calc);
    });

    return () => {
      pan.removeListener(id);
    };
  }, []);

  useEffect(() => {
    console.log({ panY });
    const liquid = 100 - (panY * 100) / 259;
    const zeroCheck = liquid < 0 ? 0 : liquid;
    setLiquidHeight(zeroCheck);
    setText(`${(zeroCheck / 100).toFixed(2)}`);
  }, [panY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        const y = pan.y.__getValue();
        setLastYCoord(y);
        if (y < 0) {
          pan.flattenOffset();
        } else {
          pan.extractOffset();
        }
      },
    })
  ).current;

  const clampedY = pan.y.interpolate({
    inputRange: [minY, maxY],
    outputRange: [minY, maxY],
    extrapolate: "clamp",
  });

  return useMemo(() => {
    return (
      <View>
        <Svg
          fill="#000"
          width="256"
          height="264"
          viewBox="0 0 50 50"
          style={styles.image}
          key={liquidHeight}
        >
          <Defs>
            <ClipPath id="clip-path-liquid">
              <Rect width="256px" height={50 - 50 * (liquidHeight / 100)} />
            </ClipPath>
          </Defs>

          <Path
            d="M22 0C20.347656 0 19 1.347656 19 3L19 5C19 6.160156 19.839844 7 21 7C21 7.640625 20.640625 8.101563 20 8.21875C15.296875 9.25 12 13.3125 12 18.09375L12 20.125C12 21.429688 12.835938 22.554688 14 22.96875L14 37.0625C12.835938 37.476563 12 38.601563 12 39.90625L12 45C12 47.757813 14.242188 50 17 50L33 50C35.757813 50 38 47.757813 38 45L38 39.90625C38 38.601563 37.164063 37.476563 36 37.0625L36 37L16 37L16 35L36 35L36 25L16 25L16 23L36 23L36 22.96875C37.164063 22.554688 38 21.429688 38 20.125L38 18.09375C38 13.3125 34.707031 9.257813 29.96875 8.21875C29.363281 8.109375 29 7.640625 29 7C30.160156 7 31 6.160156 31 5L31 3C31 1.347656 29.652344 0 28 0Z"
            fill="green"
            stroke="#000"
            strokeWidth={1}
          />
          <Path
            d="M22 0C20.347656 0 19 1.347656 19 3L19 5C19 6.160156 19.839844 7 21 7C21 7.640625 20.640625 8.101563 20 8.21875C15.296875 9.25 12 13.3125 12 18.09375L12 20.125C12 21.429688 12.835938 22.554688 14 22.96875L14 37.0625C12.835938 37.476563 12 38.601563 12 39.90625L12 45C12 47.757813 14.242188 50 17 50L33 50C35.757813 50 38 47.757813 38 45L38 39.90625C38 38.601563 37.164063 37.476563 36 37.0625L36 37L16 37L16 35L36 35L36 25L16 25L16 23L36 23L36 22.96875C37.164063 22.554688 38 21.429688 38 20.125L38 18.09375C38 13.3125 34.707031 9.257813 29.96875 8.21875C29.363281 8.109375 29 7.640625 29 7C30.160156 7 31 6.160156 31 5L31 3C31 1.347656 29.652344 0 28 0Z"
            fill="white"
            clipPath="url(#clip-path-liquid)"
          />
        </Svg>
        <Animated.View
          style={{
            transform: [{ translateY: clampedY }],
            alignItems: "flex-end",
            position: "absolute",
          }}
          {...panResponder.panHandlers}
        >
          <View style={styles.barWrapper}>
            <View style={styles.dragBar} />
            <View style={styles.ball}>
              <Text style={{ textAlign: "center" }}>
                {liquidHeight?.toFixed(0)}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }, [liquidHeight]);
};

const styles = StyleSheet.create({
  image: {
    marginHorizontal: "auto",
    marginBottom: 35,
    marginTop: 20,
    zIndex: -1,
  },
  dragBar: {
    width: "85%",
    height: 4,
    backgroundColor: "black",
    zIndex: 1,
  },
  ball: {
    width: 45,
    height: 45,
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 5,
    borderRadius: "50%",
    justifyContent: "center",
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 0,
    width: "100%",
  },
});
