import { baseServerUrl } from "../constants/Config";
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

// TODO: could work better with switch case
export function notificationStatusToText(status: NotificationStatus) {
  return NotificationText[status];
}
