import type { TouchableOpacity } from "react-native";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import type { LegacyRef } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import WifiCard from "../(password)/WifiCard";
import StyledButton from "../../components/StyledButton";
import { isDebugActive } from "../../constants/Config";
import { setDeviceConfig, setDeviceName } from "../../helpers/functions";

export default function DeviceNameScreen() {
  const [name, setName] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isValid, setIsValid] = useState<boolean | undefined>();

  useEffect(() => {
    if (isValid && !isConnecting) {
      // Dismiss keyboard so next button becomes visible
      Keyboard.dismiss();
    }
  }, [isConnecting, isValid]);

  async function setDeviceNameFunc() {
    setIsConnecting(true);
    if (isDebugActive) {
      setTimeout(() => {
        setIsValid(true);
        setIsConnecting(false);
      }, 500);
    } else {
      setIsConnecting(true);
      setDeviceName(name).then((res) => {
        setIsConnecting(false);
        setIsValid(res);
      });
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <WifiCard
          name={"Device name"}
          connectWithWifi={setDeviceNameFunc}
          isConnecting={isConnecting}
          isEncrypted={true}
          isValid={isValid}
          password={name}
          setPassword={setName}
          inputHeader="Set your device name (plant name, nickname, etc)"
          successText="Name set!"
          buttonText="Update name"
          placeholder="Your device name..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <Link href={"/(networks)"} asChild>
          <StyledButton
            title="Next"
            buttonStyle={styles.nextButton}
            disabled={!isValid}
          />
        </Link>
      </View>
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
  flex: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 40,
    width: "100%",
    // backgroundColor: "red",
  },
  nextButton: {
    // flex: 1,
    alignSelf: "flex-end",
    borderWidth: 0,
  },
});
