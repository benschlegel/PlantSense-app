import type { StyleProp, TextStyle } from "react-native";
import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  style?: StyleProp<TextStyle>;
  iconSize: number;
};
export default function StyledIcon({
  name,
  color,
  iconSize,
  style,
  ...props
}: IconProps) {
  return (
    <FontAwesome
      style={style}
      size={iconSize}
      name={name}
      color={color}
      {...props}
    />
  );
}
