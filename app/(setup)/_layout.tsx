import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import Colors from "../../constants/Colors";

export default function SetupLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
