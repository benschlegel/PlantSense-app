import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import AnimatedLottieView from "lottie-react-native";

import Colors from "../../constants/Colors";
import HappyPlanty from "../../assets/lottie/Planty_happy_led.json";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DeviceInfoScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <AnimatedPressable
        // href={"/(device-info)"}
        // asChild
        style={styles.lottie}
        // style={{ backgroundColor: "green" }}
        // onPress={() => router.push("/(device-info)")}
        onPress={() => console.log("pressed")}
      >
        <AnimatedLottieView
          source={HappyPlanty}
          autoPlay
          resizeMode="center"
          loop
          speed={0.95}
          style={styles.lottie}
          // colorFilters={[filter && filter]}
          // animatedProps={}
        />
      </AnimatedPressable>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    flex: 1,
  },
});
