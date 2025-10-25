import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList,  Text } from 'react-native';
import Card from './Card'; 

export default function App() {
  const phones = [
    { id: '1', title: 'iPhone 15', price: 4200, description: 'კამერა, დიზაინი და შესრულება' },
    { id: '2', title: 'Samsung S24', price: 3900, description: 'ძლიერი ეკრანი და ბატარეა' },
    { id: '3', title: 'Xiaomi 14', price: 2500, description: 'კარგი ხარისხი დაბალ ფასად' },
  ];

  const laptops = [
    { id: '1', title: 'MacBook Air M2', price: 5200, description: 'თხელი, მსუბუქი და სწრაფი' },
    { id: '2', title: 'ASUS ZenBook', price: 4200, description: 'სოლიდური დიზაინი და წარმადობა' },
    { id: '3', title: 'Lenovo IdeaPad', price: 3100, description: 'საუკეთესო ვარიანტი სტუდენტებისთვის' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={phones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
          />
        )}
        ListHeaderComponent={<Text style={styles.listTitle}>📱 ტელეფონები</Text>}
      />

      <FlatList
        data={laptops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            price={item.price}
            description={item.description}
          />
        )}
        ListHeaderComponent={<Text style={styles.listTitle}>💻 ლეპტოპები</Text>}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
