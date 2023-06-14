import type { ViewStyle, StyleProp } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Colors from "../constants/Colors";

type HrProps = {
  style?: StyleProp<ViewStyle>;
  height?: number;
};

export default function Hr({ style, height }: HrProps) {
  const heightStyle: StyleProp<ViewStyle> = { height: height ? height : 4 };
  return <View style={[styles.hr, style, heightStyle]} />;
}

const styles = StyleSheet.create({
  hr: {
    marginVertical: 6,
    height: 4,
    width: "100%",
    opacity: 0.7,
    backgroundColor: Colors.light.light,
    borderRadius: 2,
    // marginHorizontal: 8,
  },
});
