import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledInput from "../../components/StyledInput";
import StyledIcon from "../../components/StyledIcon";
import StyledButton from "../../components/StyledButton";
import type { CredentialsResponse, Credentials } from "../../constants/Types";
import { typedFetch } from "../../helpers/functions";
import { setupServerUrl } from "../../constants/Config";

export default function PasswordScreen() {
  const { name, isEncrypted } = useLocalSearchParams();
  console.log("IsEncrypted: ", isEncrypted);
  const [password, setPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isValid, setIsValid] = useState<boolean | undefined>();

  function connectWithWifi() {
    setIsValid(undefined);
    setIsConnecting(true);
    const payload: Credentials = { ssid: name as string, password: password };

    // typedFetch<CredentialsResponse>(setupServerUrl + "/tryCredentials", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // }).then((res) => {
    //   console.log("Res: ", res);
    //   setIsValid(res.isValid);
    // });
    setTimeout(() => {
      setIsConnecting(false);
      setIsValid(false);
    }, 2000);
  }
  return (
    <View style={styles.container}>
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
      {isValid === false && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Password incorrect. Please try again.
          </Text>
        </View>
      )}
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
  buttonContainer: {
    marginTop: 28,
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
    // backgroundColor: "transparent",
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
    // backgroundColor: "red",
  },
});
