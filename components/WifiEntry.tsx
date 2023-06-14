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
          <View style={styles.nameContainer}>
            <StyledIcon
              name="wifi"
              iconSize={17}
              color={Colors.light.dark}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.deviceText, { fontWeight: "bold" }]}>
              {name}
            </Text>
          </View>
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
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
