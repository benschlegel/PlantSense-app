import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import Colors from "../constants/Colors";

type InputProps = {
  value?: string;
  header?: string;
  onChange?: (text: string) => void;
  hidePassword?: boolean;
  placeholder?: string;
};

export default function StyledInput({
  value,
  onChange,
  hidePassword,
  header,
  placeholder,
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      {header && <Text style={styles.subheaderText}>{header}</Text>}
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.background}
        cursorColor={Colors.light.background}
        value={value}
        secureTextEntry={hidePassword}
        // keyboardType={"numeric"}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 16,
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
});
