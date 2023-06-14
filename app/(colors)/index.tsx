import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledButton from "../../components/StyledButton";
import { sendLedRequest } from "../../helpers/functions";
import StyledInput from "../../components/StyledInput";

export default function ColorsScreen() {
  const [red, setRed] = useState<string>("");
  const [green, setGreen] = useState<string>("");
  const [blue, setBlue] = useState<string>("");

  function saveColors() {
    const redInt = parseInt(red);
    const greenInt = parseInt(green);
    const blueInt = parseInt(blue);
    sendLedRequest(redInt, greenInt, blueInt);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Customize colors</Text>
        <Text style={styles.subheaderText}>
          Pick predefined color or choose your own
        </Text>
        <ScrollView contentContainerStyle={styles.configContainer}>
          <StyledButton
            title="Pink"
            buttonStyle={[styles.nextButton, styles.brown]}
            onPress={() => sendLedRequest(255, 16, 25)}
            disabled={false}
          />
          <StyledButton
            title="Purple"
            buttonStyle={[styles.nextButton, styles.purple]}
            onPress={() => sendLedRequest(170, 27, 255)}
            disabled={false}
          />
          <StyledButton
            title="Cyan"
            buttonStyle={[styles.nextButton, styles.cyan]}
            onPress={() => sendLedRequest(0, 255, 255)}
            disabled={false}
          />
          <Hr />
          <StyledInput
            header="Red"
            placeholder="0-255"
            value={red}
            onChange={setRed}
          />
          <StyledInput
            header="Green"
            placeholder="0-255"
            value={green}
            onChange={setGreen}
          />
          <StyledInput
            header="Blue"
            placeholder="0-255"
            value={blue}
            onChange={setBlue}
          />
          {/* <Text>{"SSID: " + ssidInput}</Text> */}
        </ScrollView>
      </View>
      <View style={styles.nextContainer}>
        {/* <Link href={"/(main)"} asChild> */}
        <StyledButton
          title="Save"
          buttonStyle={styles.nextButton}
          disabled={false}
          onPress={() => saveColors()}
        />
        {/* </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 30,
    paddingVertical: 25,
  },
  mainContainer: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.light.dark,
    opacity: 0.8,
    fontSize: 26,
  },
  configContainer: {
    marginTop: 30,
    gap: 24,
    paddingBottom: 20,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 16,
  },
  nextContainer: {
    marginBottom: 30,
    alignSelf: "flex-end",
    width: "100%",
  },
  nextButton: {
    backgroundColor: Colors.light.dark,
    alignSelf: "flex-end",
    width: "100%",
  },
  purple: {
    backgroundColor: "#9336B4",
  },
  brown: {
    backgroundColor: "#FFAAC9",
  },
  cyan: {
    backgroundColor: "#068DA9",
  },
});
