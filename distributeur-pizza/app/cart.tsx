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

interface Pizza {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const pizzasData: Pizza[] = [
  {
    id: 1,
    name: "Margherita 1",
    price: 8.99,
    imageUrl:
      "https://img.cuisineaz.com/660x660/2013/12/20/i18445-margherite.jpeg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Pepperoni",
    price: 10.99,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pepperoni_pizza.jpg/800px-Pepperoni_pizza.jpg",
    quantity: 1,
  },
];

export default function CartPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>(pizzasData);

  // Fonction pour gérer l'augmentation ou la diminution de la quantité
  const updateQuantity = (id: number, action: "increment" | "decrement") => {
    setPizzas((prevPizzas) =>
      prevPizzas.map((pizza) =>
        pizza.id === id
          ? {
            ...pizza,
            quantity:
              action === "increment"
                ? pizza.quantity + 1
                : pizza.quantity > 1
                  ? pizza.quantity - 1
                  : pizza.quantity,
          }
          : pizza
      )
    );
  };

  // Fonction pour supprimer une pizza du panier
  const removePizza = (id: number) => {
    setPizzas((prevPizzas) => prevPizzas.filter((pizza) => pizza.id !== id));
  };

  // Calcul du total
  const calculateTotal = () => {
    return pizzas.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);
  };

  const renderItem = ({ item }: { item: Pizza }) => (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => removePizza(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price.toFixed(2)}€</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, "decrement")}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, "increment")}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.content}>
        <Text style={styles.heading}>Votre Panier</Text>
        <FlatList
          data={pizzas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList} // Ajout du style flatList
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

      <Footer />
    </View>
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
});
