import { baseServerUrl } from "../constants/Config";

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
