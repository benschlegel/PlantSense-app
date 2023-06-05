import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import {
  deleteNotification,
  notificationStatusToText,
} from "../helpers/functions";

import Hr from "./Hr";

type NotificationProps = {
  deviceName: string;
  notifications: number[];
  fetchNotifications: () => void;
};

export default function Notification({
  deviceName,
  notifications,
  fetchNotifications,
}: NotificationProps) {
  const notificationAmount = notifications.length;

  // Delete notifications on server, then re-fetch new ones
  const clearNotification = (name: string, index: number) => {
    deleteNotification(deviceName, index);
    fetchNotifications();
  };
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationTopRow}>
        <View style={styles.deviceInfoContainer}>
          <Text style={styles.deviceNameText}>{deviceName}</Text>
          <Text style={styles.notificationNumberText}>
            {notificationAmount + " new alert(s)"}
          </Text>
        </View>
        <Text />
      </View>
      <View style={styles.notificationBubble}>
        {notifications.map((notification, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => clearNotification(deviceName, index)}
              >
                <View style={styles.singleNotificationContainer}>
                  <Text style={styles.notificationInfoText}>
                    {notificationStatusToText(notification)}
                  </Text>
                </View>
              </TouchableOpacity>
              {index < notificationAmount - 1 && <Hr key={index + 10} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.light.primary2,
    width: "87%",
    // height: 30,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  notificationTopRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
  },
  deviceInfoContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  deviceNameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  notificationNumberText: {
    fontWeight: "400",
    fontSize: 14,
    color: Colors.light.dark,
  },
  singleNotificationContainer: {
    display: "flex",
    backgroundColor: Colors.light.light,
    // width: "93%",
    borderRadius: 8,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationInfoText: {
    color: Colors.light.dark,
    fontWeight: "500",
    fontSize: 16,
  },
  notificationBubble: {
    width: "100%",
  },
});
