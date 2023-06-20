import type { Dispatch, SetStateAction } from "react";

export type NotificationResponse = number[];
export type NotificationType = {
  deviceName: string;
  notifications: NotificationStatus[];
  host: string;
};
export type DevicesResponse = string[];

// Additional properties only sent if credentials were succsesful
export type CredentialsResponse = {
  isValid: boolean;
  deviceName?: string;
  host?: string;
};

export type RegisterBody = {
  deviceName: string;
  host: string;
};

export enum NotificationStatus {
  LOW_WATER,
  HIGH_WATER,
  LOW_SUN,
  HIGH_SUN,
  LOW_SOIL,
  HIGH_SOIL,
  NONE = -1,
}

export type DeviceInfo = {
  host: string;
  deviceName: string;
};

export type WifiInfo = {
  ssid: string;
  isEncrypted: boolean;
};

export type Credentials = {
  ssid: string;
  password: string;
};

export type DeviceInfoPayload = {
  deviceName: string;
};

export type DeviceInfoSetter = Dispatch<SetStateAction<DeviceInfo[]>>;

type CurrentDeviceIndex = number;
type CurrentDeviceIndexSetter = Dispatch<SetStateAction<number>>;

export type AppContextType = [
  DeviceInfo[],
  DeviceInfoSetter,
  CurrentDeviceIndex,
  CurrentDeviceIndexSetter
];

export type RgbPayload = {
  red: number;
  green: number;
  blue: number;
};

export type CurrentInfoResponse = {
  totalNotificationAmount: number;
  isBreathing: boolean;
  rgb: RgbPayload;
};
