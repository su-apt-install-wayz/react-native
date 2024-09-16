// HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import CartButton from '../CartBoutton';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <CartButton item={{ id: 1, name: 'Pizza', description: 'Delicious pizza', price: '$10', image_url: '...' }} />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default HomeScreen;
