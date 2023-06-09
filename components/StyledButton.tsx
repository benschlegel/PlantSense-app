import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { forwardRef, type LegacyRef } from "react";

import Colors from "../constants/Colors";

type StyledButtonProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  disabledOpacity?: number;
};

const StyledButton = forwardRef(function Button(
  {
    title,
    buttonStyle,
    textStyle,
    containerStyle,
    onPress,
    disabled,
    isLoading,
    disabledOpacity,
  }: StyledButtonProps,
  ref?: LegacyRef<TouchableOpacity>
) {
  const opacity: StyleProp<ViewStyle> = {
    opacity: disabledOpacity ? disabledOpacity : 0.45,
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.buttonColorContainer, buttonStyle, disabled && opacity]}
        onPress={onPress}
        ref={ref}
      >
        <Text style={textStyle ? textStyle : styles.textStyle}>{title}</Text>
        {isLoading && (
          <ActivityIndicator
            color={Colors.light.light}
            style={styles.activityIndicator}
          />
        )}
      </TouchableOpacity>
    </View>
  );
});

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  activityIndicator: {
    marginLeft: 8,
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
    flexDirection: "row",
  },
  textStyle: {
    color: Colors.light.light,
    fontSize: 16,
  },
});
