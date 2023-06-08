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
import { NotificationStatus } from "../../constants/Types";
import { useInterval } from "../../hooks/useInterval";
import Notification from "../../components/Notification";
import { baseServerUrl } from "../../constants/Config";

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
  const [notifications, setNotifications] = useState<NotificationType[]>([
    { name: "Planty", notifications: [0, 1] },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 650);
  }, []);

  const fetchNotifications = useCallback(async () => {
    const data = await fetch(baseServerUrl + "/allNotifications");
    const devicesJson: NotificationType[] = await data.json();
    // console.log(devicesJson);
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
    // marginBottom: 32,
    // paddingBottom: 32,
    // marginTop: 32,
  },
  notificationContainerStyle: {
    width: "100%",
    // paddingBottom: 200,
  },
});
