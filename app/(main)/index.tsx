import { StyleSheet } from "react-native";
import AnimatedLottieView from "lottie-react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require("../../assets/lottie/Pothos.json")}
        autoPlay
        loop
        speed={0.9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
