import type { Dispatch, SetStateAction } from "react";

export type NotificationResponse = number[];
export type NotificationType = {
  name: string;
  notifications: NotificationStatus[];
};
export type DevicesResponse = string[];

// Additional properties only sent if credentials were succsesful
export type CredentialsResponse = {
  isValid: boolean;
  deviceName?: string;
  host?: string;
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

export type AppContextType = [DeviceInfo[], DeviceInfoSetter];
