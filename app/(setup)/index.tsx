import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";
import { getDeviceAvailable } from "../../helpers/functions";

// How many times to attempt connection to esp for
const connectionAttemps = 5;
export default function Setup() {
  const [isDeviceAvailable, setIsDeviceAvailable] = useState<
    undefined | boolean
  >(undefined);

  useEffect(() => {
    //
  }, []);
  async function checkAvailable() {
    let isAvailable = false;
    for (let i = 0; i < connectionAttemps; i++) {
      // Override isAvailable: true, if successful (and break)
      isAvailable = await getDeviceAvailable();
      if (isAvailable) {
        break;
      }
    }

    // set to isAvailable (true, if got response and false by default)
    setIsDeviceAvailable(isAvailable);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Connect to your device</Text>
      <View style={styles.topContainer}>
        <Text>Test</Text>
        <Text>{"Device available: " + isDeviceAvailable}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Scan for devices"
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
    paddingHorizontal: 30,
    paddingVertical: 25,
    backgroundColor: Colors.light.background,
  },
  topContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: "column",
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
});
