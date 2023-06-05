import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import type {
  NotificationType,
  NotificationResponse,
} from "../../constants/Types";
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
  const [notifications, setNotifications] = useImmer<NotificationType[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 650);
  }, []);
  // const [];

  // Fetch devices on mount/page load
  // TODO: remove (+ state vars), already covered by fetchNotifications
  useEffect(() => {
    const fetchDevices = async () => {
      const data = await fetch(baseServerUrl + "/devices");
      const devicesJson: string[] = await data.json();
      setDevices(devicesJson);
    };
    fetchDevices().catch((err) => console.log(err));
  }, []);

  const fetchNotifications = useCallback(async () => {
    const data = await fetch(baseServerUrl + "/allNotifications");
    const devicesJson: NotificationType[] = await data.json();
    setNotifications(devicesJson);
    // console.log("Notis:", devicesJson[0].notifications);
  }, [setNotifications]);

  // Load notificationson page load (without waiting for next interval)
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Get notifications in interval
  useInterval(() => {
    // getDevices();
    fetchNotifications();
  }, 1500);

  const testArr = [
    "Plant has been exposed to too much sunlight. Please move the plant.",
    "Plant is thirsty. Please water the plant.",
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.notificationContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={Colors.light.light}
            colors={[Colors.light.primary2]}
          />
        }
        style={styles.notificationContainerStyle}
      >
        {notifications.map((notification, index) => {
          return (
            <Notification
              deviceName={notification.name}
              notifications={notification.notifications}
              fetchNotifications={fetchNotifications}
              key={index}
            />
          );
        })}
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
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    marginVertical: 32,
  },
  notificationContainerStyle: {
    width: "100%",
    // paddingBottom: 20,
  },
});
