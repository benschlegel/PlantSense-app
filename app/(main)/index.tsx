import { StyleSheet } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  iconSize: number;
}) {
  return <FontAwesome size={props.iconSize} {...props} />;
}

export default function MainScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.red}>
          <View style={styles.buttonContainer}>
            <TabBarIcon name="gear" iconSize={34} color={Colors.light.text} />
            <TabBarIcon name="bell" iconSize={28} color={Colors.light.text} />
          </View>
          <View style={styles.infoContainer}>{/* <Text>Test</Text> */}</View>
        </View>
        <View style={styles.green}>{/* <Text>Test</Text> */}</View>
      </View>
      <AnimatedLottieView
        source={require("../../assets/lottie/Pothos.json")}
        autoPlay
        loop
        speed={0.9}
        style={styles.absolute}
      />
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
  absolute: {
    position: "absolute",
    top: 0,
    right: 0,
    alignSelf: "center",
  },
  red: {
    flex: 1,
    // backgroundColor: "red",
    width: "100%",
  },
  green: {
    // backgroundColor: "green",
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 33,
    marginTop: 70,
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "column",
    backgroundColor: Colors.light.light,
  },
});
