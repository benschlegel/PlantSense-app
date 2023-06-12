import { Redirect } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { getSetupStateFromStorage } from "../helpers/functions";

async function isComplete() {
  return await getSetupStateFromStorage();
}

const Index = () => {
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>();

  useLayoutEffect(() => {
    isComplete().then((complete) => {
      setIsSetupComplete(complete);
    });
  }, []);

  const href = isSetupComplete ? "/(main)" : "/(setup)";
  // While isSetupComplete is not evaluated, return empty view
  // Once its evaluated, return redirect to new route
  return isSetupComplete === undefined ? <View /> : <Redirect href={href} />;
};
export default Index;
