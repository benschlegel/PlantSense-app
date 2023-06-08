import {
  baseServerUrl,
  demoStringDeviceName,
  setupServerUrl,
} from "../constants/Config";
import { NotificationText } from "../constants/Constants";
import type { NotificationStatus } from "../constants/Types";

const deleteNotificationEndpoint = "/clearNotification";
export async function deleteNotification(deviceName: string, index: number) {
  // Add '?' for parameter, URLSearchParams handles the rest
  const response = await fetch(
    baseServerUrl +
      deleteNotificationEndpoint +
      "?" +
      new URLSearchParams({
        name: deviceName,
        index: index.toString(),
      }).toString(),
    { method: "DELETE" }
  )
    .then((res) => res.json())
    .catch((error) => {
      // console.error("Device not found.");
      return;
    });
}

/**
 * Checks if device is available during setup mode (checks predefined ip address)
 * Waits 4 seconds for response
 * @returns true, if device is reached/available, false, if connection was aborted
 */
export function getDeviceAvailable() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    fetch(setupServerUrl + "/heartbeat", {
      signal: controller.signal,
    }).then(() => {
      // If request was successful, pass success status code
      console.log("Esp heartbeat ack");
      // return demoStringDeviceName;
    });
    // console.log(response);
    // If heartbeat was available, connection was successful
    return true;
  } catch (error) {
    // 503 service unavailable
    console.log("Error:", error);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

// TODO: could work better with switch case
export function notificationStatusToText(status: NotificationStatus) {
  return NotificationText[status];
}
