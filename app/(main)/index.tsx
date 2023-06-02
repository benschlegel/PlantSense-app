import { Platform, StyleSheet } from "react-native";
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
            <TabBarIcon name="gear" iconSize={34} color={Colors.light.dark} />
            <TabBarIcon name="bell" iconSize={28} color={Colors.light.dark} />
          </View>
          <View style={styles.infoContainer}>{/* <Text>Test</Text> */}</View>
        </View>
        <View style={styles.green}>
          <View style={styles.buttonColorContainer}>
            <Text>Change Colors</Text>
          </View>
        </View>
      </View>
      {Platform.OS === "ios" && (
        <AnimatedLottieView
          source={require("../../assets/lottie/Pothos.json")}
          autoPlay
          loop
          speed={0.95}
          style={styles.absolute}
        />
      )}
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
    top: 20,
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  infoContainer: {
    flexDirection: "column",
    backgroundColor: Colors.light.light,
  },
});
