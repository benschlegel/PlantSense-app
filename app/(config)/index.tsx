import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Colors from "../../constants/Colors";
import Hr from "../../components/Hr";
import StyledButton from "../../components/StyledButton";

export default function Config() {
  const [hostInput, setHostInput] = useState<string>();
  const [ssidInput, setSsidInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [isConfigSetSuccess, setIsConfigSetSuccess] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Device configuration</Text>
        <View style={styles.configContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.subheaderText}>Host</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="e.g. 'http://129.168.1.124'"
              placeholderTextColor={Colors.light.background}
              value={hostInput}
              onChangeText={setHostInput}
            />
          </View>
          <Hr />
          <View style={styles.inputContainer}>
            <Text style={styles.subheaderText}>Wifi name (ssid)</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="e.g. 'My home network'"
              selectionColor={Colors.light.background}
              placeholderTextColor={Colors.light.background}
              value={ssidInput}
              onChangeText={setSsidInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.subheaderText}>Wifi password</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="e.g. 'password1234'"
              placeholderTextColor={Colors.light.background}
              value={passwordInput}
              onChangeText={setPasswordInput}
            />
          </View>
          {/* <Text>{"SSID: " + ssidInput}</Text> */}
        </View>
        <Hr style={{ marginTop: 30 }} />
        <View style={styles.confirmConfigContainer}>
          <StyledButton
            title="Set config"
            disabled={!ssidInput || !passwordInput || !hostInput}
            buttonStyle={{ width: "100%" }}
          />
        </View>
        {isConfigSetSuccess && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              Device setup was successful! You can now continue.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.nextContainer}>
        <StyledButton
          title="Next"
          buttonStyle={styles.nextButton}
          disabled={!isConfigSetSuccess}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 25,
    backgroundColor: Colors.light.background,
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
  },
  successContainer: {
    marginTop: 30,
  },
  successText: {
    fontSize: 17,
    color: "green",
  },
});
