import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import type { AnimatedLottieViewProps } from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Badge } from "@rneui/themed";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import HappyPlanty from "../../assets/lottie/Planty_happy_led.json";
import SadPlanty from "../../assets/lottie/Planty_sad_led.json";
import Cube from "../../assets/lottie/cube-example.json";
import HappyPlantyDefault from "../../assets/lottie/Planty_new.json";
import StyledIcon from "../../components/StyledIcon";
import { getDevicesFromStorage, typedFetch } from "../../helpers/functions";
import { useInterval } from "../../hooks/useInterval";
import { baseServerUrl } from "../../constants/Config";
import type { ColorFilter, CurrentInfoResponse } from "../../constants/Types";
import { AppContext } from "../../constants/Constants";
import DeviceInfo from "../../components/DeviceInfo";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLottie = Animated.createAnimatedComponent(AnimatedLottieView);
Animated.addWhitelistedNativeProps({ colorFilters: true });
Animated.addWhitelistedUIProps({ colorFilters: true });

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  iconSize: number;
}) {
  return <FontAwesome size={props.iconSize} {...props} />;
}

export default function MainScreen() {
  useEffect(() => {
    // HappyPlanty.layers[0].
    getDevicesFromStorage().then((res) => {
      console.log("Devices: ", res);
    });
  }, []);

  const [currentState, setCurrentState] = useState<CurrentInfoResponse>();
  const [currentColor, setCurrentColor] = useState("green");

  const [devices, setDevices, currentDeviceIndex, setCurrentDeviceIndex] =
    useContext(AppContext);
  const router = useRouter();

  const colorProgress = useSharedValue(0);

  const animatedProps = useAnimatedProps<
    Partial<AnimatedLottieViewProps>
  >(() => {
    // draw a circle
    // const newPlanty = HappyPlanty.layers
    // if (colorProgress.value === 1) {
    // }
    // const colors = interpolateColor(
    //   colorProgress.value,
    //   [0, 1],
    //   ["red", "yellow"]
    // )
    //   .split("(")[1]
    //   .split(")")[0]
    //   .split(", ")
    //   .map((val, index) =>
    //     index !== 3 ? parseFloat(val) / 255.0 : parseFloat(val)
    //   );
    // const b = Cube;
    // Cube.layers[0].shapes[0].it[2].c!.k[2] = colorProgress.value;
    return {
      // source: Cube,
      colorFilters: [
        {
          keypath: "Shape Layer 1",
          color: interpolateColor(
            colorProgress.value,
            [0, 1],
            ["yellow", "red"]
          ),
        },
      ],
    };
  }, [colorProgress]);

  const animatedBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        ["red", "green"]
      ),
    };
  });

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

  useInterval(() => {
    if (devices && devices.length > 0) {
      fetchInfo();
    }
  }, 750);

  useLayoutEffect(() => {
    if (devices && devices.length > 0) {
      fetchInfo();
    }
  }, [devices, fetchInfo]);

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
        {/* <View style={styles.lottie} pointerEvents="none"> */}
        <AnimatedPressable
          // href={"/(device-info)"}
          // asChild
          style={styles.lottie}
          // style={{ backgroundColor: "green" }}
          // onPress={() => router.push("/(device-info)")}
        >
          {currentState && currentState.totalNotificationAmount > 0 ? (
            <AnimatedLottie
              source={SadPlanty}
              autoPlay
              loop
              resizeMode="center"
              speed={0.95}
              // style={styles.lottie}
              colorFilters={[
                {
                  keypath: "LEDs fill",
                  color: currentColor,
                },
              ]}
            />
          ) : (
            // TODO: switch source to useAnimatedProps and animate raw json
            <AnimatedLottie
              source={Cube}
              autoPlay
              // resizeMode="center"
              loop
              speed={0.95}
              style={[styles.lottie]}
              // colorFilters={[filter && filter]}
              animatedProps={animatedProps}
            />
          )}
        </AnimatedPressable>
        {/* </View> */}
        <Animated.View
          style={[{ width: 100, height: 100 }, animatedBackground]}
        />
        <View style={styles.green}>
          {/* <Link href="/(colors)" asChild> */}
          <TouchableOpacity
            style={styles.buttonColorContainer}
            onPress={
              () => {
                console.log("Changed color");
                // Cube.layers[0].shapes[0].it[2].c!.k = [1, 1, 1, 1];
                colorProgress.value = withTiming(1 - colorProgress.value, {
                  duration: 500,
                });
              }
              // (colorProgress.value = withTiming(1 - colorProgress.value, {
              //   duration: 500,
              // }))
            }
          >
            <Text>Change Colors</Text>
          </TouchableOpacity>
          {/* </Link> */}
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
    // position: "absolute",
    // top: 20,
    // right: 0,
    // backgroundColor: "green",
    // height: 400,
    width: "100%",
    flex: 1,
    alignItems: "center",
    // margin: 100,
    // alignContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    // verticalAlign: "middle",
  },
  red: {
    // flex: 1,
    // backgroundColor: "blue",
    paddingBottom: 80,
    width: "100%",
  },
  green: {
    // backgroundColor: "green",
    // flex: 1,
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
