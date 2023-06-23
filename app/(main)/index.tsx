import type { ViewStyle } from "react-native";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import type { LegacyRef } from "react";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useFocusEffect, useNavigation, useRouter } from "expo-router";
import { Badge } from "@rneui/themed";
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import HappyPlanty from "../../assets/lottie/Planty_happy_led.json";
import SadPlanty from "../../assets/lottie/Planty_sad_led.json";
import HappyPlantyDefault from "../../assets/lottie/Planty_new.json";
import StyledIcon from "../../components/StyledIcon";
import { getDevicesFromStorage, typedFetch } from "../../helpers/functions";
import { useInterval } from "../../hooks/useInterval";
import { baseServerUrl } from "../../constants/Config";
import type { ColorFilter, CurrentInfoResponse } from "../../constants/Types";
import { AppContext } from "../../constants/Constants";
import DeviceInfo from "../../components/DeviceInfo";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function MainScreen() {
  const [currentState, setCurrentState] = useState<CurrentInfoResponse>();
  const [currentColor, setCurrentColor] = useState("green");
  const lottieRef = useAnimatedRef<AnimatedLottieView>();
  const isFocused = useIsFocused();

  const [devices, setDevices, currentDeviceIndex, setCurrentDeviceIndex] =
    useContext(AppContext);

  const fetchInfo = useCallback(() => {
    const params = new URLSearchParams({
      host: devices[currentDeviceIndex].host,
    });
    typedFetch<CurrentInfoResponse>(
      baseServerUrl + "/currentInfo?" + params.toString()
    ).then((res) => {
      setCurrentState(res);
      const color =
        "rgba(" +
        res.rgb.red +
        "," +
        res.rgb.green +
        "," +
        res.rgb.blue +
        ",1)";
      // console.log("Curr color: ", color);
      setCurrentColor(color);
    });
  }, [currentDeviceIndex, devices]);

  const currentSource = useMemo(() => {
    if (currentState && currentState.totalNotificationAmount > 0) {
      return SadPlanty;
    }
    return HappyPlanty;
  }, [currentState]);

  useInterval(() => {
    if (devices && devices.length > 0) {
      fetchInfo();
    }
  }, 750);

  useLayoutEffect(() => {
    if (devices && devices.length > 0) {
      fetchInfo();
    }
    if (isFocused) {
      lottieRef.current?.resume();
    }
  }, [devices, fetchInfo, isFocused, lottieRef]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.red}>
          <View style={styles.buttonContainer}>
            {/* <TabBarIcon name="gear" iconSize={34} color={Colors.light.dark} /> */}
            <Link href={"/(settings)"} asChild>
              <Pressable>
                {({ pressed }) => (
                  <StyledIcon
                    name="gear"
                    iconSize={34}
                    color={Colors.light.dark}
                  />
                )}
              </Pressable>
            </Link>
            <Link href={"/(notifications)"} asChild>
              <Pressable>
                {({ pressed }) => (
                  <>
                    <StyledIcon
                      name="bell"
                      iconSize={28}
                      color={Colors.light.dark}
                    />
                    {currentState &&
                      currentState.totalNotificationAmount > 0 && (
                        <Badge
                          value={currentState?.totalNotificationAmount}
                          status="error"
                          containerStyle={{
                            position: "absolute",
                            top: -3,
                            opacity: 0.9,
                            left: 15,
                          }}
                        />
                      )}
                  </>
                )}
              </Pressable>
            </Link>
          </View>
        </View>
        {/* <DeviceInfo /> */}

        {/* Planty animation on main screen, now works on both ios and android */}
        <AnimatedPressable
          // href={"/(device-info)"}
          // asChild
          style={styles.lottie}
          // style={{ backgroundColor: "green" }}
          // onPress={() => router.push("/(device-info)")}
        >
          <AnimatedLottieView
            source={currentSource}
            autoPlay
            loop
            resizeMode="center"
            speed={0.95}
            style={styles.lottie}
            ref={lottieRef}
            colorFilters={[
              {
                keypath: "LEDs fill",
                color: currentColor,
              },
            ]}
          />
        </AnimatedPressable>
        <View style={styles.green}>
          <Link href="/(colors)" asChild>
            <TouchableOpacity style={styles.buttonColorContainer}>
              <Text>Change Colors</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  red: {
    paddingBottom: 80,
    width: "100%",
  },
  green: {
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    paddingBottom: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 33,
    marginTop: 70,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonColorContainer: {
    backgroundColor: Colors.light.primary2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    width: "40%",
    borderColor: Colors.light.dark,
    borderWidth: 1.5,
    marginTop: 48,
  },
});
