import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { Link } from "expo-router";

import NfcScan from "../../assets/lottie/nfc.json";
import Wifi from "../../assets/lottie/wifi.json";
import Colors from "../../constants/Colors";
import { MonoText } from "../../components/StyledText";
import StyledButton from "../../components/StyledButton";

const defaultText =
  "Scan your PlantSense chip and connect to it's wifi to get started.";
const deviceFoundText =
  "Device has been found! Please proceed to set up your new device.";

const defaultButtonText = "Connect to device";
const deviceFoundButtonText = "Go to setup";
export default function NfcScreen() {
  const [isDeviceFound, setIsDeviceFound] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  async function scanForDevice() {
    setIsScanning(true);
    setTimeout(() => {
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
        source={NfcScan}
        autoPlay
        loop
        speed={0.95}
        style={styles.lottie}
      />
      <View style={styles.buttonContainer}>
        {/* Switch button if device was found. This makes it easier to wrap new button with Link */}
        {isDeviceFound ? (
          <Link href={"/(networks)"} asChild>
            <StyledButton
              title={deviceFoundButtonText}
              buttonStyle={styles.buttonStyle}
            />
          </Link>
        ) : (
          <StyledButton
            title={defaultButtonText}
            buttonStyle={styles.buttonStyle}
            isLoading={isScanning}
            onPress={() => scanForDevice()}
          />
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
    marginBottom: 30,
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
