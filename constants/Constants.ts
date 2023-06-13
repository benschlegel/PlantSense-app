import React, { createContext } from "react";

import type { AppContextType, DeviceInfo } from "./Types";

// Notification text for "NotificationStatus" enum (used to convert status code to text)
export const NotificationText = [
  "Your plant requires water. Please water the plant.",
  "Your plant has been watered too much. Please remove excess water if possible",
  "Your plant has been exposed to too much sunlight. Please move the plant.",
  "Your plant needs more sunlight. Please move the plant.",
  "Your plant needs more fertilizer. Please add more.",
  "Your plant has too much fertilizer. Please inspect the soil.",
];

export const AppContext = createContext<AppContextType>([
  [],
  () => {
    return;
  },
]);
