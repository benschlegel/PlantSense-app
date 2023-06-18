import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Colors from "../constants/Colors";

import StyledIcon from "./StyledIcon";

type InputProps = {
  value?: string;
  header?: string;
  onChange?: (text: string) => void;
  isPasswordField?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  autofocus?: boolean;
  headerStyle?: StyleProp<TextStyle>;
  outlineColor?: string;
};

export default function StyledInput({
  value,
  onChange,
  isPasswordField = false,
  header,
  placeholder,
  containerStyle,
  autofocus,
  headerStyle,
  outlineColor,
}: InputProps) {
  const [isHidden, setIsHidden] = useState(true);
  const outline: StyleProp<TextStyle> = {
    color: outlineColor,
    borderColor: outlineColor,
  };
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {header && (
        <Text style={[styles.subheaderText, headerStyle, outline]}>
          {header}
        </Text>
      )}
      <View style={[styles.input, outline]}>
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.background}
          selectionColor={Colors.light.background}
          cursorColor={Colors.light.background}
          value={value}
          secureTextEntry={isPasswordField && isHidden}
          // keyboardType={"numeric"}
          onChangeText={onChange}
          autoFocus={autofocus}
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
            <StyledIcon
              name={isHidden ? "eye-slash" : "eye"}
              color={Colors.light.light}
              iconSize={20}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    // height: 80,
  },
  subheaderText: {
    color: Colors.light.dark,
    fontSize: 16,
  },
  input: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primary2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.dark,
  },
  iconStyle: {
    paddingRight: 16,
    opacity: 0.75,
  },
  inputStyle: {
    // width: "100%",
    color: Colors.light.light,
    flexGrow: 1,
    height: 46,
    paddingLeft: 16,
  },
});
