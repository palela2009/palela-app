import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import Card from './Card';

export default function PhoneListScreen({ navigation }) {
  const phones = [
    { id: '1', title: 'iPhone 15', price: 4200, description: 'ახალი მოდელი.' },
    { id: '2', title: 'Samsung S24', price: 3900, description: 'ბრწყინვალე კამერა.' },
    { id: '3', title: 'Xiaomi 14', price: 1800, description: 'კარგი ბალანსი ფასში.' },
  ];

  return (
    <View style={styles.container}>
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
      />
      <Button title="ნახე ლეპტოპები" onPress={() => navigation.navigate('Laptops')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
