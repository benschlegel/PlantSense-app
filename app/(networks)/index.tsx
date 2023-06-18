import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link } from "expo-router";
import AnimatedLottieView from "lottie-react-native";

import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";
import type { WifiInfo } from "../../constants/Types";
import WifiEntry from "../../components/WifiEntry";
import { removeDuplicateNetworks, typedFetch } from "../../helpers/functions";
import { isDebugActive, setupServerUrl } from "../../constants/Config";
import Wifi from "../../assets/lottie/wifi_android.json";

const debugNetworks: WifiInfo[] = [
  { ssid: "Encryped wifi", isEncrypted: true },
  { ssid: "Open wifi", isEncrypted: false },
];

function Networks() {
  const isDeviceAvailable = true;
  const deviceFoundText =
    "To get started, choose a wifi network to connect your PlantSense device to.";
  const defaultText =
    "To get started, please select your home wifi and enter the password.";
  const [isScanActive, setIsScanActive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [networks, setNetworks] = useState<WifiInfo[]>(
    isDebugActive ? debugNetworks : []
  );

  async function getNetworks() {
    setIsScanActive(true);
    typedFetch<WifiInfo[]>(setupServerUrl + "/networks").then((res) => {
      const newArr = removeDuplicateNetworks(res);
      setIsScanActive(false);
      setNetworks(newArr);
    });
  }

  function loadNetworks() {
    if (isDebugActive) {
      mockNetworks();
    } else {
      getNetworks();
    }
  }

  const mockNetworks = useCallback(() => {
    setIsScanActive(true);
    setTimeout(() => {
      setIsScanActive(false);
      networks.push({
        ssid: "WWWWWWWWWWWWWW",
        isEncrypted: true,
      });
      setNetworks([...networks]);
    }, 5000);
  }, [networks]);

  // TODO: figure out why networks wont load
  // Start loading networks on navigate
  // useEffect(() => {
  //   if (!isDebugActive) {
  //     mockNetworks();
  //   } else {
  //     getNetworks();
  //   }
  // }, [mockNetworks]);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Connect your device to wifi</Text>
      <Text style={styles.subheaderText}>
        {isDeviceAvailable ? deviceFoundText : defaultText}
      </Text>
      <View style={styles.topContainer}>
        <ScrollView
          contentContainerStyle={styles.networkContainer}
          style={styles.networkOuter}
          scrollEnabled={!isScanActive}
        >
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
            <View style={styles.loadingContainer}>
              <View style={styles.deviceContainer}>
                <View style={styles.plantContainer}>
                  <Text style={styles.deviceText}>Scanning...</Text>
                  <ActivityIndicator color={Colors.light.dark} />
                </View>
              </View>
              <View style={styles.lottieContainer}>
                <AnimatedLottieView
                  source={Wifi}
                  autoPlay
                  loop
                  speed={0.95}
                  style={{
                    opacity: 1,
                    // height: "96%",
                    // alignSelf: "center",
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
        {/* <Link href="/modal" asChild> */}
        <StyledButton
          title="Scan for networks"
          textStyle={{ color: "#000", opacity: 0.7, fontSize: 15.5 }}
          buttonStyle={{
            width: "87%",
            marginBottom: 22,
            backgroundColor: Colors.light.background,
            borderWidth: 0,
          }}
          containerStyle={{ paddingTop: 16 }}
          disabled={isScanActive}
          onPress={() => loadNetworks()}
        />
        {/* </Link> */}
      </View>
      <View style={styles.deviceNotFoundContainer}>
        <Text style={{ color: Colors.light.dark }}>{"Wifi not found? "}</Text>
        <Text style={{ color: Colors.light.dark, fontWeight: "bold" }}>
          click here
        </Text>
      </View>
      {/* <View style={styles.placeholder} /> */}
    </View>
  );
}

export default memo(Networks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 25,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  lottieContainer: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.light.light,
    opacity: 0.95,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 16,
    // paddingVertical: 165,
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
    fontSize: 24,
    opacity: 0.8,
  },
  deviceContainer: {
    paddingHorizontal: 26,
    // marginBottom: 150,
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
    paddingRight: 16,
  },
  networkContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    gap: 22,
    // backgroundColor: "red",
  },
  networkOuter: {
    marginTop: 32,
    // paddingBottom: 32,
    // backgroundColor: "red",
  },
  deviceNotFoundContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: -12,
    marginBottom: 50,
    marginLeft: 10,
  },
});
