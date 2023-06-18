import type { StyleProp, ViewStyle } from "react-native";
import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";

import NfcScan from "../../assets/lottie/nfc.json";
import DeviceFound from "../../assets/lottie/device_found.json";
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
const deviceFoundButtonText = "Proceeding to setup";

const redirectHref = "/(device-name)";

const isAutoProceeding = false;
export default function NfcScreen() {
  const [isDeviceFound, setIsDeviceFound] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useContext(AppContext);
  const router = useRouter();

  const topMargin: StyleProp<ViewStyle> = {
    marginTop: Platform.OS === "ios" ? 60 : 50,
  };

  useEffect(() => {
    if (isDeviceFound && isAutoProceeding) {
      setTimeout(() => {
        router.push(redirectHref);
      }, 6000);
    }
  }, [isDeviceFound, router]);

  function handleScan() {
    if (!isDebugActive) {
      scanForDevice();
    } else {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setIsDeviceFound(true);
      }, 1500);
    }
  }

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
    }, 750);
  }
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, topMargin]}>
        <MonoText style={styles.headerText}>PlantSense</MonoText>
      </View>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheaderText}>
          {isDeviceFound ? deviceFoundText : defaultText}
        </Text>
      </View>
      <View style={styles.placeholder} />
      {isDeviceFound ? (
        <AnimatedLottieView
          source={DeviceFound}
          autoPlay
          loop={false}
          speed={0.95}
          style={[styles.lottie, styles.deviceFoundAnimation]}
          resizeMode="cover"
        />
      ) : (
        <AnimatedLottieView
          source={NfcScan}
          autoPlay
          loop
          resizeMode="cover"
          speed={0.95}
          style={styles.lottie}
        />
      )}
      <View style={styles.buttonContainer}>
        {/* Switch button if device was found. This makes it easier to wrap new button with Link */}
        {isDeviceFound ? (
          <Link href={redirectHref} asChild>
            <StyledButton
              title={deviceFoundButtonText}
              isLoading={isDeviceFound && isAutoProceeding}
              buttonStyle={styles.buttonStyle}
            />
          </Link>
        ) : (
          <View style={styles.buttons}>
            <StyledButton
              title={defaultButtonText}
              buttonStyle={styles.buttonStyle}
              isLoading={isScanning}
              disabled={isScanning}
              onPress={() => handleScan()}
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
    // marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    color: Colors.light.dark,
    fontWeight: "bold",
  },
  lottie: {
    width: "100%",
    // backgroundColor: "red",
    marginVertical: 12,
    flexGrow: 1,
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor: "red",
  },
  deviceFoundAnimation: {
    marginVertical: 48,
  },
  buttons: { gap: 20 },
  buttonContainer: {
    // flex: 1,
    marginBottom: 60,
    marginTop: 20,
  },
  subheaderContainer: {
    marginTop: 12,
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
    paddingHorizontal: 24,
    paddingVertical: 14,
    width: "70%",
  },
  placeholder: {
    marginTop: 12,
  },
});
