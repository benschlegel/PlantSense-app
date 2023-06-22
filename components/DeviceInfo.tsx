import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";

export default function DeviceInfo() {
  return (
    <View style={styles.notificationContainer}>
      <Text>T</Text>
      <View style={styles.notificationTopRow}>
        <View style={styles.deviceInfoContainer}>
          <Text style={styles.deviceNameText}>Test</Text>
          <Text style={styles.notificationNumberText}>{"online"}</Text>
        </View>
        <Text />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.light.primary2,
    width: "100%",

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
    flex: 1,
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
