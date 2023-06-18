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
import { isDebugActive, setupServerUrl } from "../../constants/Config";

import WifiCard from "./WifiCard";

export default function PasswordScreen() {
  const { name, isEncrypted } = useLocalSearchParams();
  const encrypted = isEncrypted === "true";
  const [password, setPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isValid, setIsValid] = useState<boolean | undefined>();

  function connectWithWifi() {
    if (!isDebugActive) {
      setIsValid(undefined);
      setIsConnecting(true);
      const payload: Credentials = { ssid: name as string, password: password };

      typedFetch<CredentialsResponse>(setupServerUrl + "/tryCredentials", {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => {
          console.log("Res: ", res);
          setIsValid(res.isValid);
          setIsConnecting(false);
        })
        .catch(() => setIsConnecting(false));
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsValid(true);
      }, 2000);
    }
  }
  return (
    <View style={styles.container}>
      {(isValid === undefined || isValid === false || isValid === true) && (
        <WifiCard
          name={name as string}
          connectWithWifi={connectWithWifi}
          isConnecting={isConnecting}
          isEncrypted={encrypted}
          isValid={isValid}
          password={password}
          setPassword={setPassword}
          isPasswordCard={true}
        />
      )}
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
});
