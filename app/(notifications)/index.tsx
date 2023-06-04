import { StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import type { NotificationResponse } from "../../constants/Types";
import { useInterval } from "../../hooks/useInterval";
import Notification from "../../components/Notification";

const baseServerUrl = "http://192.168.141.24";
const notificationsEndpoint = "/notifications";

async function getNotifications(deviceName: string) {
  // Add '?' for parameter, URLSearchParams handles the rest
  const response: NotificationResponse = await fetch(
    baseServerUrl +
      notificationsEndpoint +
      "?" +
      new URLSearchParams({
        name: deviceName,
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

export default function MainScreen() {
  const [devices, setDevices] = useState<string[]>([]);

  // Fetch devices on mount/page load
  useEffect(() => {
    const fetchDevices = async () => {
      const data = await fetch(baseServerUrl + "/devices");
      const devicesJson: string[] = await data.json();
      setDevices(devicesJson);
    };
    fetchDevices().catch((err) => console.log(err));
  }, []);

  // Get notifications in interval
  useInterval(() => {
    // getDevices();
  }, 1500);

  const testArr = [
    "Plant has been exposed to too much sunlight. Please move the plant.",
    "Plant is thirsty. Please water the plant.",
  ];
  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        {devices.map((name, index) => {
          return (
            <Notification
              deviceName={name}
              notificationAmount={0}
              notifications={testArr}
              key={index}
            />
          );
        })}
      </View>
      {/* <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.red]}
          onPress={() => console.log("test")}
        >
          <Text>Devices</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={styles.buttonColorContainer}
          onPress={() => getNotifications(devices[1])}
        >
          <Text>Notifications</Text>
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
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 24,
  },
});
