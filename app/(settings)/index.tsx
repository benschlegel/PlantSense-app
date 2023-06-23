import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useContext, useEffect } from "react";
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

async function getBaseEndpoint() {
  const response = await fetch(baseServerUrl);
  const jsonData = await response.text();
  console.log(jsonData);
}

async function checkHeartbeat() {
  const response = await fetch(baseServerUrl + "/heartbeat")
    .then((res) => {
      const { status } = res;
      console.log("Received status code: ", status);
    })
    .catch((error) => {
      console.error("Heartbeat Error:", error);
    });
}

async function getNotifications() {
  const response: NotificationResponse = await fetch(
    baseServerUrl +
      "/notifications?" +
      new URLSearchParams({
        name: "PlantSense - Planty",
      }).toString()
  )
    .then((res) => res.json())
    .catch((error) => {
      // console.error("Device not found.");
      return;
    });

  if (!response) {
    console.error("Device not found.");
  } else {
    console.log("Response (notifications): ", response);
  }
}

export default function SettingsScreen() {
  const [devices, setDevices, currentDeviceIndex, setCurrentDeviceIndex] =
    useContext(AppContext);

  function registerDevice() {
    const deviceName = "testDevice" + devices.length;
    const payload: RegisterBody = { deviceName: deviceName, host: deviceName };
    console.log("Payload: ", payload);
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
  }

  async function sendSetStateRequest(state: NotificationStatus) {
    const payload = {
      state: state,
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
        console.log("setState response: ", res);
        if (devices && devices.length > 0) {
          const { host } = devices[currentDeviceIndex];

          sendLedRequest(rgb.red, rgb.green, rgb.blue, host, isBreathing);
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
        <StyledButton
          title="purple"
          buttonStyle={{ backgroundColor: "purple" }}
          onPress={() =>
            sendLedRequest(255, 63, 0, devices[currentDeviceIndex].host)
          }
          // onPress={() => sendLedRequest(0, 255, 0)}
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
          title="Toggle breathing"
          onPress={() => toggleBreathing(devices[currentDeviceIndex].host)}
        />
        <StyledButton
          title="Turn off LED"
          onPress={() =>
            sendLedRequest(0, 0, 0, devices[currentDeviceIndex].host)
          }
        />
        <Link href="/(nfc)" asChild style={{ marginBottom: 20 }}>
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
      {/* <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.red]}
          onPress={() => sendLedRequest(255, 255, 0)}
        >
          <Text>Red</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={styles.buttonColorContainer}
          onPress={() => sendLedRequest(0, 255, 0)}
        >
          <Text>Green</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.blue]}
          onPress={() => sendLedRequest(0, 0, 255)}
        >
          <Text>Blue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.blue]}
          onPress={() => getNotifications()}
        >
          <Text>heartbeat check</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
