import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  baseServerUrl,
  demoStringDeviceName,
  setupServerUrl,
} from "../constants/Config";
import { NotificationText } from "../constants/Constants";
import type {
  DeviceInfo,
  DeviceInfoPayload,
  NotificationStatus,
  RgbFull,
  WifiInfo,
} from "../constants/Types";

const deleteNotificationEndpoint = "/clearNotification";
export function deleteNotification(host: string, index: number) {
  // Add '?' for parameter, URLSearchParams handles the rest
  typedFetch<RgbFull>(
    baseServerUrl +
      deleteNotificationEndpoint +
      "?" +
      new URLSearchParams({
        host: host,
        index: index.toString(),
      }).toString(),
    { method: "DELETE" }
  )
    .then((res) => {
      sendLedRequest(
        res.rgb.red,
        res.rgb.green,
        res.rgb.blue,
        host,
        res.isBreathing
      );
    })
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
export function getDeviceAvailable(): Promise<null | DeviceInfo> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  const resultPromise = new Promise<null | DeviceInfo>((resolve, reject) => {
    //
    typedFetch<DeviceInfo>(setupServerUrl + "/deviceInfo", {
      signal: controller.signal,
    })
      .then((res) => {
        resolve(res);
        clearTimeout(timeoutId);
      })
      .catch((err) => {
        console.error("Error while getting device: ", err);
        resolve(null);
      });
  });

  return resultPromise;
}

// TODO: dead/old endpoint, remove
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

export async function sendLedRequest(
  red: number,
  green: number,
  blue: number,
  host: string,
  isBreathing?: boolean
) {
  const ledEndpoint = "/led";
  const payload: RgbFull = {
    rgb: {
      red: red,
      green: green,
      blue: blue,
    },
    isBreathing: isBreathing ? isBreathing : false,
  };
  const address = "http://" + host + ".local";
  console.log("address: " + address);

  // fetch(address + "/deviceInfo")
  //   .then((res) => res.json())
  //   .then((resp) => {
  //     console.log("device info response: ", resp);
  //   });
  // Send post request to esp
  fetch(address + ledEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export function toggleBreathing(host: string) {
  const address = "http://" + host + ".local";
  fetch(address + "/toggleState", {
    method: "POST",
  });
}

/**
 * Sets the deviceName on the microcontroller
 * @param name deviceName to be set
 * @returns true, if successful or false, if not successful
 */
export async function setDeviceName(name: string): Promise<boolean> {
  const payload: DeviceInfoPayload = {
    deviceName: name,
  };

  return new Promise<boolean>((resolve, reject) => {
    fetch(setupServerUrl + "/deviceInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
}

/**
 * Get all devices from storage
 * @returns promise of all devices
 */
export async function getDevicesFromStorage(): Promise<DeviceInfo[]> {
  try {
    const jsonValue = await AsyncStorage.getItem("devices");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error while reading from storage: ", e);
    return [];
  }
}

/**
 * Deletes all devices from local storage.
 * @returns true, if successful, false if not
 */
export async function clearDevicesFromStorage(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem("devices");
    return true;
  } catch (e) {
    console.error("Error while clearing devices: ", e);
    return false;
  }
}

/**
 * Add new device to storage.
 * If no devices are stored yet, creates a new array and pushes entry.
 * @param device new device to add to storage. If device.host matches an existing entry, it will be overridden.
 * Otherwise, it will be appended.
 */
export async function addDeviceToStorage(device: DeviceInfo) {
  try {
    // Get old items from storage, push new entry and save item to storage
    AsyncStorage.getItem("devices").then((devices) => {
      const d: DeviceInfo[] = devices ? JSON.parse(devices) : [];
      const found = d.find((item) => item.host === device.host);

      if (found) {
        // If element with matching host was found, replace entry
        d[d.indexOf(found)] = device;
      } else {
        // Otherwise, push new entry
        d.push(device);
      }
      AsyncStorage.setItem("devices", JSON.stringify(d));
    });
  } catch (e) {
    console.error("Error while writing to storage: ", e);
  }
}

/**
 * Overrides all devices and saves them to storage.
 * @param devices new list of devices to save/override to storage.
 */
export async function saveDevicesToStorage(devices: DeviceInfo[]) {
  try {
    const jsonValue = JSON.stringify(devices);
    await AsyncStorage.setItem("devices", jsonValue);
  } catch (e) {
    console.error("Error while writing to storage: ", e);
  }
}

export async function getSetupStateFromStorage(): Promise<boolean> {
  try {
    const jsonValue = await AsyncStorage.getItem("setup");
    return jsonValue != null ? JSON.parse(jsonValue) : false;
  } catch (e) {
    console.error("Error while reading from storage: ", e);
    return false;
  }
}

/**
 * Saves setup state to local storage
 * @param isComplete new state for setup complete (true -> setup is complete, false -> setup is not complete)
 */
export async function saveSetupStateToStorage(isComplete: boolean) {
  try {
    const jsonValue = JSON.stringify(isComplete);
    await AsyncStorage.setItem("setup", jsonValue);
  } catch (e) {
    console.error("Error while reading from storage: ", e);
  }
}

/**
 * Returns typed fetch result (parsed to json)
 * @param input input of fetch
 * @param init init of fetch
 * @returns typed result
 */
export function typedFetch<E>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  return new Promise<E>((resolve, reject) => {
    fetch(input, init)
      .then((res) => {
        res
          .json()
          .then((resp: E) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Removes duplicates from array of networks (filtered by ssid).
 * @param networks array of networks to dedupe
 * @returns networks without duplicates.
 */
export function removeDuplicateNetworks(networks: WifiInfo[]) {
  return networks.filter(
    (v, i, a) => a.findIndex((v2) => v2.ssid === v.ssid) === i
  );
}
