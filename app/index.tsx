import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import {
  getDevicesFromStorage,
  getSetupStateFromStorage,
} from "../helpers/functions";
import { AppContext } from "../constants/Constants";

async function isComplete() {
  return (await getDevicesFromStorage()).length > 0;
}

const Index = () => {
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>();

  useEffect(() => {
    isComplete().then((complete) => {
      setIsSetupComplete(complete);
    });
  }, []);

  const href = isSetupComplete ? "/(main)" : "/(nfc)";
  // While isSetupComplete is not evaluated, return empty view
  // Once its evaluated, return redirect to new route
  return isSetupComplete === undefined ? <View /> : <Redirect href={href} />;
};
export default Index;
