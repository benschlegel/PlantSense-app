import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { Link } from "expo-router";

import NfcScan from "../../assets/lottie/nfc.json";
import Wifi from "../../assets/lottie/wifi_new.json";
// import Wifi from "../../assets/lottie/wifi.json";
import Colors from "../../constants/Colors";
import { MonoText } from "../../components/StyledText";
import StyledButton from "../../components/StyledButton";
import type { DeviceInfo } from "../../constants/Types";
import { getDeviceAvailable } from "../../helpers/functions";
import { AppContext } from "../../constants/Constants";
import { isDebugActive } from "../../constants/Config";

const defaultText =
  "Scan your PlantSense chip and connect to it's wifi to get started.";
const deviceFoundText =
  "Device has been found! Please proceed to set up your new device.";

const defaultButtonText = "Connect to device";
const connectionAttemps = 5;
const deviceFoundButtonText = "Go to setup";
export default function NfcScreen() {
  const [isDeviceFound, setIsDeviceFound] = useState(isDebugActive);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useContext(AppContext);

  async function scanForDevice() {
    setIsScanning(true);
    setTimeout(async () => {
      let deviceInfo: DeviceInfo | null = null;
      for (let i = 0; i < connectionAttemps; i++) {
        // Override isAvailable: true, if successful (and break)
        deviceInfo = await getDeviceAvailable();
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
          break;
        }
      }
      setIsScanning(false);
      setIsDeviceFound(true);
    }, 500);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MonoText style={styles.headerText}>PlantSense</MonoText>
      </View>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheaderText}>
          {isDeviceFound ? deviceFoundText : defaultText}
        </Text>
      </View>
      <AnimatedLottieView
        source={Wifi}
        autoPlay
        loop
        speed={0.95}
        style={styles.lottie}
      />
      <View style={styles.buttonContainer}>
        {/* Switch button if device was found. This makes it easier to wrap new button with Link */}
        {isDeviceFound ? (
          <View style={{ gap: 20 }}>
            <Link href={"/(networks)"} asChild>
              <StyledButton
                title={deviceFoundButtonText}
                buttonStyle={styles.buttonStyle}
              />
            </Link>
            <Link href={"/(main)"} asChild>
              <StyledButton title="skip" buttonStyle={styles.buttonStyle} />
            </Link>
          </View>
        ) : (
          <View style={{ gap: 20 }}>
            <StyledButton
              title={defaultButtonText}
              buttonStyle={styles.buttonStyle}
              isLoading={isScanning}
              disabled={isScanning}
              onPress={() => scanForDevice()}
            />
            <Link href={"/(main)"} asChild>
              <StyledButton title="skip" buttonStyle={styles.buttonStyle} />
            </Link>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    paddingHorizontal: 32,
  },
  headerContainer: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    color: Colors.light.dark,
    fontWeight: "bold",
  },
  lottie: {
    height: 10,
    // width: "80%",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor: "red",
  },
  buttonContainer: {
    // flex: 1,
    marginBottom: 100,
    marginTop: 20,
  },
  subheaderContainer: {
    marginTop: 20,
    // marginBottom: 20,
    // backgroundColor: Colors.light.light,
    // padding: 16,
    // borderRadius: 16,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 16,
  },
  buttonStyle: {
    borderWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "60%",
  },
});
