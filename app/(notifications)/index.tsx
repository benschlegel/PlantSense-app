import { StyleSheet } from "react-native";
import AnimatedLottieView from "lottie-react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>Notifications!</Text>
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
