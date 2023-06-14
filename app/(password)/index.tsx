import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledInput from "../../components/StyledInput";
import StyledIcon from "../../components/StyledIcon";

export default function PasswordScreen() {
  const { name, isEncrypted } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <View style={styles.notificationTopRow}>
          <View style={styles.deviceInfoContainer}>
            <Text style={styles.deviceNameText}>{name}</Text>
            <StyledIcon
              name={isEncrypted ? "lock" : "unlock"}
              iconSize={20}
              color={Colors.light.light}
            />
          </View>
        </View>
        <Hr height={2} style={{ marginVertical: 4 }} />
        <View style={styles.mainContainer}>
          <StyledInput
            containerStyle={{ height: 70 }}
            placeholder="wifi password..."
            header="Password"
            isPasswordField={true}
            headerStyle={{ fontSize: 17 }}
            autofocus={true}
            outlineColor={Colors.light.light}
          />
        </View>

        {/* <View style={{ flexDirection: "row", width: "100%", height: 80 }}>
        </View> */}
      </View>
      {/* <View style={{ flex: 8 }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 28,
    backgroundColor: Colors.light.background,
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flex: 1,
    backgroundColor: Colors.light.primary2,
    // width: "87%",
    // height: 30,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  mainContainer: {
    marginVertical: 18,
  },
  notificationTopRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
  },
  deviceInfoContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  deviceNameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
});
