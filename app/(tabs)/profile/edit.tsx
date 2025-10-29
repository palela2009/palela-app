import React, { useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


const profileReducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return action.initialState;
    case "SAVE":
      return state;
    default:
      return state;
  }
};

export default function EditProfileScreen() {
  const router = useRouter();

  const initialState = {
    firstName: "გიორგი",
    lastName: "ბერიძე",
    email: "giorgi.beridze@example.com",
    phone: "+995 555 12 34 56",
  };

  const [profile, dispatch] = useReducer(profileReducer, initialState);

  const handleSave = () => {
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.phone) {
      Alert.alert("შეცდომა", "გთხოვთ შეავსოთ ყველა ველი");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      Alert.alert("შეცდომა", "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა");
      return;
    }

    dispatch({ type: "SAVE" });
    Alert.alert("წარმატება", "პროფილი წარმატებით განახლდა", [
      {
        text: "კარგი",
        onPress: () => router.back(),
      },
    ]);
  };

  const handleReset = () => {
    Alert.alert(
      "გაუქმება",
      "დარწმუნებული ხართ რომ გსურთ ცვლილებების გაუქმება?",
      [
        { text: "არა", style: "cancel" },
        {
          text: "დიახ",
          onPress: () => dispatch({ type: "RESET", initialState }),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>პროფილის რედაქტირება</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>სახელი</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={profile.firstName}
              onChangeText={(value) =>
                dispatch({ type: "UPDATE_FIELD", field: "firstName", value })
              }
              placeholder="შეიყვანეთ სახელი"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>გვარი</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={profile.lastName}
              onChangeText={(value) =>
                dispatch({ type: "UPDATE_FIELD", field: "lastName", value })
              }
              placeholder="შეიყვანეთ გვარი"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ელ-ფოსტა</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(value) =>
                dispatch({ type: "UPDATE_FIELD", field: "email", value })
              }
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ტელეფონის ნომერი</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(value) =>
                dispatch({ type: "UPDATE_FIELD", field: "phone", value })
              }
              placeholder="+995 555 12 34 56"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>შენახვა</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>გაუქმება</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginHorizontal: 15,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  resetButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
