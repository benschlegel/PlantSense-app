import { StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/Colors";
import StyledButton from "../../components/StyledButton";

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Connect to your device</Text>
      <View style={styles.topContainer}>
        <Text>Test</Text>
        <Text>Test</Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Skip"
          buttonStyle={[styles.buttonStyle, styles.secondaryButton]}
        />
        <StyledButton title="Next" buttonStyle={styles.buttonStyle} />
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
  topContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: "column",
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "red",
    marginBottom: 50,
    marginTop: 20,
    marginHorizontal: 4,
    flexDirection: "row",
  },
  buttonStyle: {
    width: 110,
    height: 45,
    backgroundColor: Colors.light.dark,
    borderRadius: 16,
  },
  secondaryButton: {
    backgroundColor: Colors.light.light,
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.light.dark,
    fontSize: 26,
  },
});
