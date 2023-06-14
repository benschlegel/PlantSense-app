import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

import HappyPlanty from "../../assets/lottie/nfc.json";
import Colors from "../../constants/Colors";

export default function index() {
  return (
    <View style={styles.container}>
      <AnimatedLottieView source={HappyPlanty} autoPlay loop speed={0.95} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
});
