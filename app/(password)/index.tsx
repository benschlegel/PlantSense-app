import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import Colors from "../../constants/Colors";

export default function PasswordScreen() {
  const params = useLocalSearchParams();
  console.log("Params: ", params.name);
  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
