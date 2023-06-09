import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
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
import { baseServerUrl, isDebugActive } from "../../constants/Config";
import { typedFetch } from "../../helpers/functions";
import { AppContext } from "../../constants/Constants";
import { MonoText } from "../../components/StyledText";

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

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [devices, setDevices] = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (devices.length === 0 || !devices) {
      return;
    }
    const params = new URLSearchParams();

    for (const device of devices) {
      params.append("hosts", device.host);
    }
    typedFetch<NotificationType[]>(
      baseServerUrl + "/notifications?" + params
    ).then((res) => {
      setNotifications(res);
    });
  }, [devices]);

  const fetchDebugNotifications = useCallback(() => {
    typedFetch<NotificationType[]>(baseServerUrl + "/allNotifications").then(
      (res) => {
        setNotifications(res);
      }
    );
  }, []);

  // Load notificationson page load (without waiting for next interval)
  useEffect(() => {
    if (isDebugActive) {
      fetchDebugNotifications();
    } else {
      fetchNotifications();
    }
  }, [fetchDebugNotifications, fetchNotifications]);

  // Get notifications in interval
  useInterval(() => {
    if (isDebugActive) {
      fetchDebugNotifications();
    } else {
      fetchNotifications();
    }
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
        {!notifications || notifications.length === 0 ? (
          <View style={styles.noDevicesContainer}>
            <Text style={styles.noDevicesHeader}>No devices</Text>
            <Text style={styles.noDevicesText}>
              Get started by adding new devices
            </Text>
          </View>
        ) : (
          notifications.map((notification, index) => {
            return (
              <Notification
                deviceName={notification.deviceName}
                notifications={notification.notifications}
                host={notification.host}
                fetchNotifications={fetchNotifications}
                key={index}
              />
            );
          })
        )}
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
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    marginVertical: 32,
    // marginBottom: 32,
    paddingBottom: 60,
    // marginTop: 32,
  },
  notificationContainerStyle: {
    width: "100%",
    // paddingBottom: 200,
  },
  noDevicesText: {
    color: Colors.light.dark,
    fontSize: 17,
  },
  noDevicesContainer: {
    gap: 20,
    alignItems: "center",
  },
  noDevicesHeader: {
    color: Colors.light.dark,
    fontWeight: "500",
    fontSize: 22,
  },
});
