import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useCallback, useEffect } from "react";
import { Link } from "expo-router";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import type {
  NotificationResponse,
  NotificationStatus,
} from "../../constants/Types";
import { baseServerUrl } from "../../constants/Config";
import StyledButton from "../../components/StyledButton";
import Hr from "../../components/Hr";
import { sendLedRequest } from "../../helpers/functions";

async function sendSetStateRequest(state: NotificationStatus) {
  const payload = {
    state: state,
  };

  // Send post request to server
  fetch(baseServerUrl + "/setState", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Error:", error);
  });
}

async function getBaseEndpoint() {
  const response = await fetch(baseServerUrl);
  const jsonData = await response.text();
  console.log(jsonData);
}

async function checkHeartbeat() {
  const response = await fetch(baseServerUrl + "/heartbeat")
    .then((res) => {
      const { status } = res;
      console.log("Received status code: ", status);
    })
    .catch((error) => {
      console.error("Heartbeat Error:", error);
    });
}

async function getNotifications() {
  const response: NotificationResponse = await fetch(
    baseServerUrl +
      "/notifications?" +
      new URLSearchParams({
        name: "PlantSense - Planty",
      }).toString()
  )
    .then((res) => res.json())
    .catch((error) => {
      // console.error("Device not found.");
      return;
    });

  if (!response) {
    console.error("Device not found.");
  } else {
    console.log("Response (notifications): ", response);
  }
}

export default function SettingsScreen() {
  useEffect(() => {
    console.log("Component mount");
    return () => {
      console.log("Component did unmount");
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trigger States</Text>
      <ScrollView
        style={styles.scrollContainerStyle}
        contentContainerStyle={styles.scrollContentStyle}
      >
        <StyledButton
          title="Low water"
          buttonStyle={styles.blue}
          onPress={() => sendSetStateRequest(0)}
        />
        <StyledButton
          title="Too little sun"
          buttonStyle={styles.yellow}
          textStyle={styles.yellowText}
          onPress={() => sendSetStateRequest(2)}
        />
        <StyledButton
          title="Too little fertilizer"
          buttonStyle={styles.red}
          onPress={() => sendSetStateRequest(4)}
        />
        {/* <StyledButton
          title="blue"
          buttonStyle={styles.blue}
          onPress={() => sendLedRequest(0, 0, 255)}
        />
        <StyledButton
          title="green"
          buttonStyle={{ backgroundColor: "green" }}
          textStyle={styles.yellowText}
          onPress={() => sendLedRequest(0, 255, 0)}
        />
        <StyledButton
          title="red"
          buttonStyle={styles.red}
          onPress={() => sendLedRequest(255, 0, 0)}
        />
  */}
        <StyledButton
          title="purple"
          buttonStyle={{ backgroundColor: "purple" }}
          onPress={() => sendLedRequest(255, 63, 0)}
          // onPress={() => sendLedRequest(0, 255, 0)}
        />
        <Hr style={styles.hrStyle} />
        <StyledButton
          title="Too much water"
          buttonStyle={styles.blue}
          onPress={() => sendSetStateRequest(1)}
        />
        <StyledButton
          title="Too much sun"
          buttonStyle={styles.yellow}
          textStyle={styles.yellowText}
          onPress={() => sendSetStateRequest(3)}
        />
        <StyledButton
          title="Too much fertilizer"
          buttonStyle={styles.red}
          onPress={() => sendSetStateRequest(5)}
        />
        <Hr style={styles.hrStyle} />
        <StyledButton title="Toggle breathing" />
        <StyledButton
          title="Turn off LED"
          onPress={() => sendLedRequest(0, 0, 0)}
        />
        <Link href="/(setup)" asChild style={{ marginBottom: 20 }}>
          <StyledButton
            title="Go to setup"
            onPress={() => sendLedRequest(0, 0, 0)}
          />
        </Link>
      </ScrollView>
      {/* <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.red]}
          onPress={() => sendLedRequest(255, 255, 0)}
        >
          <Text>Red</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={styles.buttonColorContainer}
          onPress={() => sendLedRequest(0, 255, 0)}
        >
          <Text>Green</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.blue]}
          onPress={() => sendLedRequest(0, 0, 255)}
        >
          <Text>Blue</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.green}>
        <TouchableOpacity
          style={[styles.buttonColorContainer, styles.blue]}
          onPress={() => getNotifications()}
        >
          <Text>heartbeat check</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    backgroundColor: "#F45050",
  },
  blue: {
    backgroundColor: "#0079FF",
  },
  yellow: {
    backgroundColor: "#F7DB6A",
  },
  yellowText: {
    color: Colors.light.dark,
  },
  header: {
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 32,
    marginBottom: 16,
  },
  scrollContainerStyle: {
    width: "100%",
    marginTop: 16,
  },
  scrollContentStyle: {
    gap: 22,
  },
  hrStyle: {
    width: "75%",
    alignSelf: "center",
    marginVertical: 16,
  },
});
