import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Colors from "../constants/Colors";

type WifiEntryProps = {
  name: string;
  isEncrypted: boolean;
};

const twoOptionAlertHandler = (ssid: string) => {
  //function to make two option alert
  Alert.prompt(
    "Enter password",
    "Please enter the password for wifi network '" + ssid + "'.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (password) => console.log("OK Pressed, password: " + password),
      },
    ],
    "secure-text"
  );
};

export default function WifiEntry({ name, isEncrypted }: WifiEntryProps) {
  return (
    <TouchableOpacity
      style={styles.deviceContainer}
      onPress={() => twoOptionAlertHandler(name)}
    >
      <View style={styles.wifiContainer}>
        <Text style={[styles.deviceText, { fontWeight: "bold" }]}>{name}</Text>
        {isEncrypted && <Text>E</Text>}
      </View>
    </TouchableOpacity>
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
