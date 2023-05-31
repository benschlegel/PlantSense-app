import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import AnimatedLottieView from 'lottie-react-native';

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <AnimatedLottieView source={require('../../assets/lottie/Pothos.json')} autoPlay loop speed={0.9}></AnimatedLottieView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
