import type { Dispatch, SetStateAction } from "react";

export type NotificationResponse = number[];
export type NotificationType = {
  name: string;
  notifications: NotificationStatus[];
};
export type DevicesResponse = string[];

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

export type DeviceInfoSetter = Dispatch<SetStateAction<DeviceInfo[]>>;

export type AppContextType = [DeviceInfo[], DeviceInfoSetter];
