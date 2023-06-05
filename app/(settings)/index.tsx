import { StyleSheet, TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useCallback } from "react";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import type { NotificationResponse } from "../../constants/Types";
import { baseServerUrl } from "../../constants/Config";

const ledEndpoint = "/led";

async function sendLedRequest(red: number, green: number, blue: number) {
  const payload = {
    red: red,
    green: green,
    blue: blue,
  };

  // Send post request to esp
  fetch(baseServerUrl + ledEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

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
  const sendHttpRequest = useCallback(async () => {
    const response = await fetch(baseServerUrl);
    const jsonData = await response.text();
    console.log(jsonData);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Colors</Text>
      <View style={styles.green}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  green: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonColorContainer: {
    backgroundColor: Colors.light.primary2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    width: "40%",
    borderColor: Colors.light.dark,
    borderWidth: 1.5,
    marginTop: 48,
  },
  red: {
    backgroundColor: "#F45050",
  },
  blue: {
    backgroundColor: "#0079FF",
  },
});
