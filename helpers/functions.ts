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
export function getDeviceAvailable(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  const resultPromise = new Promise<boolean>((resolve, reject) => {
    fetch(setupServerUrl + "/heartbeat", {
      signal: controller.signal,
    })
      .then(() => {
        resolve(true);
        clearTimeout(timeoutId);
      })
      .catch((err) => {
        console.error("Error while getting device: ", err);
        resolve(false);
      });
  });

  return resultPromise;
}

/**
 * Send the device config to the microcontroller.
 * IMPORTANT: Device needs to be connected to microcontroller AP for this to work (reachable under 192.168.111.1)
 * @param host Host of the webserver, needs to be a full address
 * (start with 'http://' and IP afterwards, e.g. 'http://192.168.1.124')
 * @param ssid full ssid of wifi, that microcontroller should connect to
 * e.g. 'My home network'
 * @param password password of wifi, that microcontroller should connect to
 */
export async function setDeviceConfig(
  host: string,
  ssid: string,
  password: string
) {
  // Set up host payload
  const hostPayload = {
    host: host,
  };

  // Set up credentials payload
  const credentialsPayload = {
    ssid: ssid,
    password: password,
  };

  // define '/setHost' and '/setCredentials' fetch requests
  const fetches = [
    fetch(setupServerUrl + "/setHost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hostPayload),
    }),
    fetch(setupServerUrl + "/setCredentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentialsPayload),
    }),
  ];

  const resultPromise = new Promise<boolean>((resolve, reject) => {
    Promise.all(fetches)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.error("Error while setting device config: ", err);
        resolve(false);
      });
  });
  return resultPromise;
}

// TODO: could work better with switch case
export function notificationStatusToText(status: NotificationStatus) {
  return NotificationText[status];
}
