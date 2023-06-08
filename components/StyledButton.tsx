import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

type StyledButtonProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
};

export default function StyledButton({
  title,
  buttonStyle,
  textStyle,
  containerStyle,
  onPress,
  disabled,
}: StyledButtonProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.buttonColorContainer,
          buttonStyle,
          disabled && styles.disabledStyle,
        ]}
        onPress={onPress}
      >
        <Text style={textStyle ? textStyle : styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  buttonColorContainer: {
    backgroundColor: Colors.light.primary2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    width: "45%",
    borderColor: Colors.light.dark,
    borderWidth: 1.5,
  },
  textStyle: {
    color: Colors.light.light,
    fontSize: 16,
  },
  disabledStyle: {
    opacity: 0.45,
  },
});
