import { SafeAreaView } from 'react-native-safe-area-context';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.bigSquare1}>
          <View style={styles.smallSquare1} />
          <View style={styles.smallSquare2} />
        </View>
        <View style={styles.bigSquare2}>
          <View style={styles.smallSquare3} />
          <View style={styles.smallSquare4} />
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

 
  bigSquare1: {
    width: 180,
    height: 180,
    backgroundColor: '#ff6666',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  bigSquare2: {
    width: 200,
    height: 200,
    backgroundColor: '#66ccff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },


  smallSquare1: {
    width: 60,
    height: 60,
    backgroundColor: '#ffff66',
  },
  smallSquare2: {
    width: 40,
    height: 40,
    backgroundColor: '#66ff66',
  },
  smallSquare3: {
    width: 50,
    height: 50,
    backgroundColor: '#ffcc66',
  },
  smallSquare4: {
    width: 70,
    height: 70,
    backgroundColor: '#cc99ff',
  },
});
