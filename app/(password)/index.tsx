import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledInput from "../../components/StyledInput";
import StyledIcon from "../../components/StyledIcon";
import StyledButton from "../../components/StyledButton";
import type {
  CredentialsResponse,
  Credentials,
  DeviceInfo,
} from "../../constants/Types";
import { getDeviceAvailable, typedFetch } from "../../helpers/functions";
import { isDebugActive, setupServerUrl } from "../../constants/Config";
import { AppContext } from "../../constants/Constants";

import WifiCard from "./WifiCard";

export default function PasswordScreen() {
  const { name, isEncrypted } = useLocalSearchParams();
  const encrypted = isEncrypted === "true";
  const [password, setPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [devices, setDevices] = useContext(AppContext);
  const [isValid, setIsValid] = useState<boolean | undefined>();

  async function updateDevices() {
    // Override isAvailable: true, if successful (and break)
    const deviceInfo = await getDeviceAvailable();
    if (deviceInfo) {
      const found = devices.find((item) => item.host === deviceInfo?.host);

      if (found) {
        // If element with matching host was found, replace entry
        devices[devices.indexOf(found)] = deviceInfo;
        setDevices([...devices]);
      } else {
        // Otherwise, push new entry
        setDevices([...devices, deviceInfo]);
      }
    }
  }

  function connectRealDeviceWithWifi() {
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
  }

  function connectMockDeviceWithWifi() {
    setIsConnecting(true);
    setTimeout(() => {
      const mockDevice: DeviceInfo = {
        deviceName: "Test Device",
        host: "http://testing.domain.com",
      };
      setDevices([...devices, mockDevice]);
      setIsConnecting(false);
      setIsValid(true);
    }, 2000);
  }

  function connectWithWifi() {
    if (!isDebugActive) {
      connectRealDeviceWithWifi();
    } else {
      connectMockDeviceWithWifi();
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
