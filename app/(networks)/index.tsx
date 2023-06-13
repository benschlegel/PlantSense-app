import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../../constants/Colors";

export default function Networks() {
  return (
    <View style={styles.container}>
      <Text>Networks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
