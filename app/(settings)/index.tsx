import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Link } from "expo-router";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import type {
  RgbFull,
  NotificationResponse,
  RegisterBody,
} from "../../constants/Types";
import { NotificationStatus } from "../../constants/Types";
import { baseServerUrl } from "../../constants/Config";
import StyledButton from "../../components/StyledButton";
import Hr from "../../components/Hr";
import {
  sendLedRequest,
  toggleBreathing,
  typedFetch,
} from "../../helpers/functions";
import { AppContext } from "../../constants/Constants";

export default function SettingsScreen() {
  const [devices, setDevices, currentDeviceIndex, setCurrentDeviceIndex] =
    useContext(AppContext);

  const currentHost = useMemo(() => {
    if (devices && devices.length > 0 && devices[currentDeviceIndex]) {
      return devices[currentDeviceIndex].host;
    }
    return "";
  }, [currentDeviceIndex, devices]);

  const registerDevice = useCallback(() => {
    const deviceName = "testDevice" + devices.length;
    const payload: RegisterBody = { deviceName: deviceName, host: deviceName };
    fetch(baseServerUrl + "/v1/mc/registerDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => {
      setDevices([
        ...devices,
        {
          deviceName: deviceName,
          host: deviceName,
        },
      ]);
    });
  }, [devices, setDevices]);

  /**
   * Requests colors corresponding to state from server.
   * If devices are set and microcontroller is available, send color request directly to microcontroller
   * @param state what state to set
   */
  function sendSetStateRequest(state: NotificationStatus) {
    // TODO: investigate why this pauses lottie animation
    const payload = {
      state: state,
      host: currentHost,
    };

    // Send post request to server
    typedFetch<RgbFull>(baseServerUrl + "/setState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        const { rgb, isBreathing } = res;
        if (devices && devices.length > 0) {
          sendLedRequest(
            rgb.red,
            rgb.green,
            rgb.blue,
            currentHost,
            isBreathing
          );
        }
      })
      .catch((err) => {
        console.error("Error while setting state:", err);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trigger States</Text>
      <ScrollView
        style={styles.scrollContainerStyle}
        contentContainerStyle={styles.scrollContentStyle}
      >
        <StyledButton
          title="Low water"
          buttonStyle={styles.blue}
          onPress={() => sendSetStateRequest(NotificationStatus.LOW_WATER)}
        />
        <StyledButton
          title="Too little sun"
          buttonStyle={styles.yellow}
          textStyle={styles.yellowText}
          onPress={() => sendSetStateRequest(NotificationStatus.LOW_SUN)}
        />
        <StyledButton
          title="Too little fertilizer"
          buttonStyle={styles.red}
          onPress={() => sendSetStateRequest(NotificationStatus.LOW_SOIL)}
        />
        <Hr style={styles.hrStyle} />

        <StyledButton
          title="Too much water"
          buttonStyle={styles.blue}
          onPress={() => sendSetStateRequest(NotificationStatus.HIGH_WATER)}
        />
        <StyledButton
          title="Too much sun"
          buttonStyle={styles.yellow}
          textStyle={styles.yellowText}
          onPress={() => sendSetStateRequest(NotificationStatus.HIGH_SUN)}
        />
        <StyledButton
          title="Too much fertilizer"
          buttonStyle={styles.red}
          onPress={() => sendSetStateRequest(NotificationStatus.HIGH_SOIL)}
        />
        <Hr style={styles.hrStyle} />
        <StyledButton
          title="purple"
          buttonStyle={styles.purple}
          onPress={() =>
            sendLedRequest(255, 63, 0, devices[currentDeviceIndex].host)
          }
        />

        <StyledButton
          title="Toggle breathing"
          onPress={() => toggleBreathing(devices[currentDeviceIndex].host)}
        />
        <StyledButton
          title="Turn off LED"
          onPress={() =>
            sendLedRequest(0, 0, 0, devices[currentDeviceIndex].host)
          }
        />
        <Hr style={styles.hrStyle} />
        <Link href="/(nfc)" asChild>
          <StyledButton title="Go to setup" />
        </Link>
        <StyledButton title="Reset devices" onPress={() => setDevices([])} />
        <StyledButton
          title="Add test device"
          onPress={() => registerDevice()}
        />
        <StyledButton
          title="Switch devices"
          onPress={() => setCurrentDeviceIndex(currentDeviceIndex + 1)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  purple: { backgroundColor: "purple" },
  red: {
    backgroundColor: "#F45050",
  },
  blue: {
    backgroundColor: "#0079FF",
  },
  yellow: {
    backgroundColor: "#F7DB6A",
  },
  yellowText: {
    color: Colors.light.dark,
  },
  header: {
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 32,
    marginBottom: 16,
  },
  scrollContainerStyle: {
    width: "100%",
    marginTop: 16,
  },
  scrollContentStyle: {
    gap: 22,
    flexGrow: 1,
    paddingBottom: 40,
  },
  hrStyle: {
    width: "75%",
    alignSelf: "center",
    marginVertical: 16,
  },
});
