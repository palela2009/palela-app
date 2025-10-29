import { SafeAreaView } from "react-native-safe-area-context";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PhoneListScreen from "./PhoneListScreen";
import LaptopListScreen from "./LaptopListScreen";
import PhoneDetailsScreen from "./PhoneDetailsScreen";
import LaptopDetailsScreen from "./LaptopDetailsScreen";
import NotFoundScreen from "./NotFoundScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PhoneStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PhoneList"
        component={PhoneListScreen}
        options={{ title: "ტელეფონები" }}
      />
      <Stack.Screen
        name="PhoneDetails"
        component={PhoneDetailsScreen}
        options={{ title: "ტელეფონის დეტალები" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "გვერდი ვერ მოიძებნა" }}
      />
    </Stack.Navigator>
  );
}

function LaptopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LaptopList"
        component={LaptopListScreen}
        options={{ title: "ლეპტოპები" }}
      />
      <Stack.Screen
        name="LaptopDetails"
        component={LaptopDetailsScreen}
        options={{ title: "ლეპტოპის დეტალები" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "გვერდი ვერ მოიძებნა" }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileView"
        component={ProfileScreen}
        options={{ title: "პროფილი" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "რედაქტირება" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Phones") {
              iconName = focused ? "phone-portrait" : "phone-portrait-outline";
            } else if (route.name === "Laptops") {
              iconName = focused ? "laptop" : "laptop-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Phones"
          component={PhoneStack}
          options={{
            title: "ტელეფონები",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Laptops"
          component={LaptopStack}
          options={{
            title: "ლეპტოპები",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            title: "პროფილი",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
