import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";
import { getDeviceAvailable } from "../../helpers/functions";

// How many times to attempt connection to esp for
const connectionAttemps = 5;

const defaultText = "Start scanning to get started";
const deviceFoundText = "Device found! Click 'next' to configure it";
export default function Setup() {
  const [isDeviceAvailable, setIsDeviceAvailable] = useState<
    undefined | boolean
  >(undefined);

  const [isScanActive, setIsScanActive] = useState(false);

  useEffect(() => {
    //
  }, []);
  async function checkAvailable() {
    setIsScanActive(true);
    // Artifical delay for demo, remove
    setTimeout(() => {
      //
    }, 600);
    let isAvailable = false;
    for (let i = 0; i < connectionAttemps; i++) {
      // Override isAvailable: true, if successful (and break)
      isAvailable = await getDeviceAvailable();
      if (isAvailable) {
        break;
      }
    }

    setIsScanActive(false);

    // set to isAvailable (true, if got response and false by default)
    setIsDeviceAvailable(isAvailable);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Connect to your device</Text>
      <Text style={styles.subheaderText}>
        {isDeviceAvailable ? deviceFoundText : defaultText}
      </Text>
      <View style={styles.topContainer}>
        {isDeviceAvailable && (
          <View style={styles.deviceContainer}>
            <View style={styles.plantContainer}>
              <Text style={[styles.deviceText, { fontWeight: "bold" }]}>
                PlantSense - Planty
              </Text>
            </View>
          </View>
        )}
        {isScanActive && (
          <View style={styles.deviceContainer}>
            <View style={styles.plantContainer}>
              <Text style={styles.deviceText}>Scanning...</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.deviceNotFoundContainer}>
        <Text style={{ color: Colors.light.dark }}>{"Device not found? "}</Text>
        <Text style={{ color: Colors.light.dark, fontWeight: "bold" }}>
          click here
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Scan for devices"
          // buttonStyle={{ width: "100%" }}
          onPress={() => checkAvailable()}
        />
        <Link href="/(main)" asChild>
          <StyledButton title="Skip" buttonStyle={[styles.secondaryButton]} />
        </Link>
        <Link href="/(config)" asChild>
          <StyledButton
            title="Next"
            buttonStyle={styles.buttonStyleDark}
            disabled={!isDeviceAvailable}
          />
        </Link>
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
  buttonContainer: {
    gap: 16,
    // alignItems: "flex-end",
  },
  buttonStyleDark: {
    backgroundColor: Colors.light.dark,
  },
  secondaryButton: {
    backgroundColor: Colors.light.primary2,
    // alignSelf: "flex-start",
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.light.dark,
    fontSize: 26,
    opacity: 0.8,
  },
  deviceContainer: {
    paddingVertical: 32,
    paddingHorizontal: 26,
  },
  plantContainer: {
    backgroundColor: Colors.light.light,
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deviceText: {
    color: Colors.light.dark,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 15,
  },
  deviceNotFoundContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: -12,
    marginBottom: 20,
    marginLeft: 10,
  },
});
