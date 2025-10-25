import { SafeAreaView } from 'react-native-safe-area-context';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneListScreen from './PhoneListScreen';
import LaptopListScreen from './LaptopListScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Phones" component={PhoneListScreen} />
        <Stack.Screen name="Laptops" component={LaptopListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
