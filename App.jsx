import { SafeAreaView } from 'react-native-safe-area-context';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,  } from 'react-native';

export default function App() {

  const cards = [
    { id: 1, title: 'ბარათი 1', text: 'ეს არის პირველი ბარათი' },
    { id: 2, title: 'ბარათი 2', text: 'მეორე ბარათის აღწერა' },
    { id: 3, title: 'ბარათი 3', text: 'ეს ბარათი შეიცავს სხვა ტექსტს' },
    { id: 4, title: 'ბარათი 4', text: 'მეტი ბარათები რომ იყოს, შეგვიძლია დავამატოთ' },
    { id: 5, title: 'ბარათი 5', text: 'ScrollView საშუალებას გვაძლევს ყველაფერი დავასქროლოთ' },
    { id: 6, title: 'ბარათი 6', text: 'ScrollView საშუალებას გვაძლევს ყველაფერი დავასქროლოთ' },
    { id: 7, title: 'ბარათი 7', text: 'ScrollView საშუალებას გვაძლევს ყველაფერი დავასქროლოთ' },
    { id: 8, title: 'ბარათი 8', text: 'ScrollView საშუალებას გვაძლევს ყველაფერი დავასქროლოთ' },
    { id: 9, title: 'ბარათი 9', text: 'ScrollView საშუალებას გვაძლევს ყველაფერი დავასქროლოთ' },

  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardText}>{card.text}</Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});
