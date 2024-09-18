import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store'
import { updateQuantity, removeFromCart } from './redux/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();

  // Récupérer les éléments du panier depuis Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculer le total
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
    <>
      <Navbar/>
      <View style={styles.container}>
        <Text style={styles.emptyText}>Votre panier est vide</Text>
      </View>
      <Footer/>
    </>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => dispatch(removeFromCart(item.id))}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price}€</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => dispatch(updateQuantity({ id: item.id, action: "decrement" }))}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => dispatch(updateQuantity({ id: item.id, action: "increment" }))}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
    <Navbar/>
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Votre Panier</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.flatList}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: {calculateTotal().toFixed(2)}€
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Commande validée !")}
        >
          <Text style={styles.buttonText}>Valider le panier</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Footer/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 100,
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E0B044",
    marginBottom: 20,
  },
  flatList: {
    flex: 1,
    width: "100%", // Assure que la FlatList prend toute la largeur
  },
  item: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#E0B044",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#e06244",
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    width: 30,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  removeButton: {
    backgroundColor: "#e06244",
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalContainer: {
    alignItems: "flex-end",
    marginVertical: 12,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#E0B044",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 400,
  },
});
