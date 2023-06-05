import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

const isAnimationEnabled = true;

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
            {/* <TabBarIcon name="gear" iconSize={34} color={Colors.light.dark} /> */}
            <Link href={"/(settings)"} asChild>
              <Pressable>
                {({ pressed }) => (
                  <TabBarIcon
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
                  <TabBarIcon
                    name="bell"
                    iconSize={28}
                    color={Colors.light.dark}
                  />
                )}
              </Pressable>
            </Link>
          </View>
          <View style={styles.infoContainer}>{/* <Text>Test</Text> */}</View>
        </View>
        {/* <View style={{ paddingHorizontal: 200, paddingVertical: 200 }}> */}
        {Platform.OS === "ios" && isAnimationEnabled && (
          // <View pointerEvents="none">
          <AnimatedLottieView
            source={require("../../assets/lottie/Pothos.json")}
            autoPlay
            loop
            speed={0.95}
            style={styles.absolute}
          />
        )}
        {/* </View> */}
        <View style={styles.green}>
          <TouchableOpacity
            // href={"/notifications"}
            style={styles.buttonColorContainer}
            onPress={() => console.log("change colors was pressed")}
          >
            <Text>Change Colors</Text>
          </TouchableOpacity>
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
  absolute: {
    // position: "absolute",
    // top: 20,
    // right: 0,
    // backgroundColor: "red",
    // height: 400,
    width: "90%",
    flex: 1,
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
  infoContainer: {
    flexDirection: "column",
    backgroundColor: "red",
  },
});
