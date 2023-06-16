import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

import Colors from "../constants/Colors";

import StyledIcon from "./StyledIcon";

type WifiEntryProps = {
  name: string;
  isEncrypted: boolean;
};

export default function WifiEntry({ name, isEncrypted }: WifiEntryProps) {
  return (
    <Link
      href={{
        pathname: "/(password)",
        params: { name: name, isEncrypted: isEncrypted },
      }}
      asChild
    >
      <TouchableOpacity
        style={styles.deviceContainer}
        // onPress={() => twoOptionAlertHandler(name)}
      >
        <View style={styles.wifiContainer}>
          <StyledIcon name="wifi" iconSize={17} color={Colors.light.dark} />
          <Text numberOfLines={1} style={styles.deviceText}>
            {name}
          </Text>
          <StyledIcon
            name={isEncrypted ? "lock" : "unlock"}
            iconSize={18}
            color={Colors.light.dark}
          />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    // paddingVertical: 32,
    paddingHorizontal: 26,
  },
  wifiContainer: {
    backgroundColor: Colors.light.light,
    // height: 50,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    display: "flex",
    paddingVertical: 16,
    gap: 8,
    // paddingRight: 28,
  },
  deviceText: {
    color: Colors.light.dark,
    fontWeight: "bold",
    flex: 1,
    // backgroundColor: "red",
  },
});
