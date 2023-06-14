import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";
import WifiEntry from "../../components/WifiEntry";
import type { WifiInfo } from "../../constants/Types";

export default function Networks() {
  const isDeviceAvailable = true;
  const deviceFoundText = "Test1";
  const defaultText =
    "To get started, please select your home wifi and enter the password.";
  const isScanActive = false;
  const networks: WifiInfo[] = [
    { ssid: "PlantSense", isEncrypted: true },
    { ssid: "More networks", isEncrypted: false },
    { ssid: "More networks", isEncrypted: false },
    { ssid: "More networks", isEncrypted: false },
    { ssid: "More networks", isEncrypted: false },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Connect your device to wifi</Text>
      <Text style={styles.subheaderText}>
        {isDeviceAvailable ? deviceFoundText : defaultText}
      </Text>
      <View style={styles.topContainer}>
        <ScrollView contentContainerStyle={styles.networkContainer}>
          {isDeviceAvailable &&
            !isScanActive &&
            networks.map((network, index) => {
              return (
                <WifiEntry
                  name={network.ssid}
                  key={index}
                  isEncrypted={network.isEncrypted}
                />
              );
            })}
          {isScanActive && (
            <View style={styles.deviceContainer}>
              <View style={styles.plantContainer}>
                <Text style={styles.deviceText}>Scanning...</Text>
              </View>
            </View>
          )}
        </ScrollView>
        {/* <Link href="/modal" asChild> */}
        <StyledButton
          title="Scan for networks"
          textStyle={{ color: "#000", opacity: 0.9, fontSize: 15.5 }}
          buttonStyle={{
            width: "87%",
            marginBottom: 22,
            backgroundColor: Colors.light.background,
          }}
          disabled={isScanActive}
          onPress={() => {
            return;
          }}
        />
        {/* </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 25,
    backgroundColor: Colors.light.background,
  },
  topContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: "column",
    backgroundColor: Colors.light.primary2,
    borderRadius: 14,
    opacity: 0.8,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.light.dark,
    fontSize: 25,
    opacity: 0.8,
  },
  deviceContainer: {
    paddingVertical: 32,
    paddingHorizontal: 26,
  },
  deviceText: {
    color: Colors.light.dark,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 15,
    marginTop: 4,
    opacity: 0.8,
  },

  plantContainer: {
    backgroundColor: Colors.light.light,
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  networkContainer: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 22,
    marginVertical: 30,
  },
});
