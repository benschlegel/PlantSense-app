import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../constants/Colors";

type WifiEntryProps = {
  name: string;
  isEncrypted: boolean;
};
export default function WifiEntry({ name, isEncrypted }: WifiEntryProps) {
  return (
    <View style={styles.deviceContainer}>
      <View style={styles.wifiContainer}>
        <Text style={[styles.deviceText, { fontWeight: "bold" }]}>{name}</Text>
        {isEncrypted && <Text>E</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    // paddingVertical: 32,
    paddingHorizontal: 26,
  },
  wifiContainer: {
    backgroundColor: Colors.light.light,
    height: 46,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  deviceText: {
    color: Colors.light.dark,
  },
});
