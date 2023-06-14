import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledButton from "../../components/StyledButton";
import StyledIcon from "../../components/StyledIcon";
import StyledInput from "../../components/StyledInput";

type WifiCardProps = {
  name: string;
  isEncrypted: boolean;
  password: string;
  setPassword: (val: string) => void;
  isValid: boolean | undefined;
  isConnecting: boolean;
  connectWithWifi: () => void;
};

export default function WifiCard({
  name,
  isEncrypted,
  isValid,
  password,
  setPassword,
  isConnecting,
  connectWithWifi,
}: WifiCardProps) {
  return (
    <>
      <View style={styles.notificationContainer}>
        <View style={styles.notificationTopRow}>
          <View style={styles.deviceInfoContainer}>
            <View style={styles.nameContainer}>
              <StyledIcon
                name="wifi"
                iconSize={22}
                style={styles.wifiIcon}
                color={Colors.light.light}
              />
              <Text style={styles.deviceNameText}>{name}</Text>
            </View>
            <StyledIcon
              name={isEncrypted ? "lock" : "unlock"}
              iconSize={20}
              color={Colors.light.light}
              style={{ marginTop: 2 }}
            />
          </View>
        </View>
        <Hr height={2} style={styles.hr} />
        <View style={styles.mainContainer}>
          <StyledInput
            containerStyle={{ height: 70 }}
            placeholder="wifi password..."
            header="Password"
            isPasswordField={true}
            headerStyle={{ fontSize: 17 }}
            autofocus={true}
            value={password}
            onChange={setPassword}
            outlineColor={Colors.light.light}
          />
        </View>
      </View>

      <View style={styles.errorContainer}>
        {isValid === false && (
          <Text style={styles.errorText}>
            Password incorrect. Please try again.
          </Text>
        )}
        {isValid === true && (
          <Text style={styles.successText}>Wifi connected!</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Connect"
          containerStyle={{ width: "100%" }}
          buttonStyle={{ borderWidth: 0, width: "70%" }}
          disabled={isConnecting}
          isLoading={isConnecting}
          disabledOpacity={0.7}
          onPress={() => connectWithWifi()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 6,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    opacity: 0.7,
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.light.primary2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: 28,
  },
  successText: {
    color: "green",
    opacity: 0.8,
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
    justifyContent: "space-between",
    alignItems: "center",

    flex: 1,
  },
  deviceNameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  hr: {
    marginVertical: 4,
  },
  wifiIcon: { marginRight: 10 },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
