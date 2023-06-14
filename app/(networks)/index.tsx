import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";
import type { WifiInfo } from "../../constants/Types";
import WifiEntry from "../../components/WifiEntry";
import { typedFetch } from "../../helpers/functions";
import { setupServerUrl } from "../../constants/Config";

function removeDuplicateNetworks(networks: WifiInfo[]) {
  return networks.filter(
    (v, i, a) => a.findIndex((v2) => v2.ssid === v.ssid) === i
  );
}

export default function Networks() {
  const isDeviceAvailable = true;
  const deviceFoundText = "Test1";
  const defaultText =
    "To get started, please select your home wifi and enter the password.";
  const [isScanActive, setIsScanActive] = useState(false);
  const [networks, setNetworks] = useState<WifiInfo[]>([
    { ssid: "test", isEncrypted: true },
  ]);

  async function getNetworks() {
    setIsScanActive(true);
    typedFetch<WifiInfo[]>(setupServerUrl + "/networks").then((res) => {
      const newArr = removeDuplicateNetworks(res);
      setIsScanActive(false);
      setNetworks(newArr);
    });
  }

  // useEffect(() => {
  //   removeDuplicateNetworks(networks);
  //   setNetworks([...networks]);
  // }, []);
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
          // disabled={isScanActive}
          onPress={() => getNetworks()}
        />
        {/* </Link> */}
      </View>
      <View style={styles.placeholder} />
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
  placeholder: {
    marginTop: 40,
  },
  networkContainer: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 22,
    marginVertical: 30,
  },
});
