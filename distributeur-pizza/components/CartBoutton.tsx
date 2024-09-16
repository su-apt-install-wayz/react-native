import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../app/store/actions';

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface CartButtonProps {
  item: Item;
}

const CartButton: React.FC<CartButtonProps> = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleViewCart = () => {
    // Logique pour afficher la liste des produits ajoutés
    console.log(cart);
  };

  return (
    <View style={styles.container}>
      <Button title="Add to Cart" onPress={handleAddToCart} />
      <Button title="View Cart" onPress={handleViewCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default CartButton;
