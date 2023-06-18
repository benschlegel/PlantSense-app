import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import WifiCard from "../(password)/WifiCard";
import StyledButton from "../../components/StyledButton";

export default function DeviceNameScreen() {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <WifiCard
          name={"Device name"}
          connectWithWifi={() => console.log("test")}
          isConnecting={false}
          isEncrypted={true}
          isValid={true}
          password={name}
          setPassword={setName}
          inputHeader="Set your device name (plant name, nickname, etc)"
          successText="Name set!"
          buttonText="Update name"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Link href={"/(networks)"} asChild>
          <StyledButton title="Next" buttonStyle={styles.nextButton} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 28,
    backgroundColor: Colors.light.background,
  },
  flex: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 40,
    width: "100%",
    // backgroundColor: "red",
  },
  nextButton: {
    // flex: 1,
    alignSelf: "flex-end",
    borderWidth: 0,
  },
});
