import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { deleteNotification } from "../helpers/functions";

import Hr from "./Hr";

type NotificationProps = {
  deviceName: string;
  notifications: number[];
};

export default function Notification({
  deviceName,
  notifications,
}: NotificationProps) {
  const notificationAmount = notifications.length;
  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationTopRow}>
        <View style={styles.deviceInfoContainer}>
          <Text style={styles.deviceNameText}>{deviceName}</Text>
          <Text style={styles.notificationNumberText}>
            {notificationAmount + " new notifications"}
          </Text>
        </View>
        <Text />
      </View>
      <View style={styles.notificationBubble}>
        {notifications.map((notification, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => deleteNotification(deviceName, index)}
              >
                <View style={styles.singleNotificationContainer}>
                  <Text style={styles.notificationInfoText}>
                    {notification}
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
