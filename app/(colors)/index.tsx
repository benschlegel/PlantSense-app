import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledButton from "../../components/StyledButton";
import { sendLedRequest } from "../../helpers/functions";

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
        <View style={styles.configContainer}>
          <StyledButton
            title="Purple"
            buttonStyle={[styles.nextButton, styles.purple]}
            onPress={() => sendLedRequest(255, 16, 25)}
            disabled={false}
          />
          <StyledButton
            title="Pink"
            buttonStyle={[styles.nextButton, styles.brown]}
            onPress={() => sendLedRequest(255, 255, 0)}
            disabled={false}
          />
          <StyledButton
            title="Cyan"
            buttonStyle={[styles.nextButton, styles.cyan]}
            onPress={() => sendLedRequest(0, 255, 255)}
            disabled={false}
          />
          <Hr />
          <View style={styles.inputContainer}>
            <Text style={styles.subheaderText}>Red</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="0-255"
              placeholderTextColor={Colors.light.background}
              value={red}
              onChangeText={setRed}
              keyboardType={"numeric"}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.subheaderText}>Green</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="0-255"
              selectionColor={Colors.light.background}
              placeholderTextColor={Colors.light.background}
              value={green}
              keyboardType={"numeric"}
              onChangeText={setGreen}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.subheaderText}>Blue</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="0-255"
              placeholderTextColor={Colors.light.background}
              value={blue}
              keyboardType={"numeric"}
              onChangeText={setBlue}
            />
          </View>
          {/* <Text>{"SSID: " + ssidInput}</Text> */}
        </View>
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
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  inputStyle: {
    width: "100%",
    height: 46,
    paddingLeft: 16,
    backgroundColor: Colors.light.primary2,
    color: Colors.light.light,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.dark,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 16,
  },
  confirmConfigContainer: {
    marginTop: 20,
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
  successContainer: {
    marginTop: 30,
  },
  successText: {
    fontSize: 17,
    color: "green",
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