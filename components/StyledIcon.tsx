import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  iconSize: number;
};
export default function StyledIcon({
  name,
  color,
  iconSize,
  ...props
}: IconProps) {
  return <FontAwesome size={iconSize} name={name} color={color} {...props} />;
}
