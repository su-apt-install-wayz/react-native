import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, Button } from "react-native";
import axios from 'axios';

// Définir l'interface Pizza pour TypeScript
interface Pizza {
  id: number;
  name: string;
  price: number;
  image_url: string;
  ingredients: string[];
}

export default function ProductList() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://192.168.1.154:3000/pizzas');
      setPizzas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const renderItem = ({ item }: { item: Pizza }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{item.name}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price}€</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => Alert.alert("Ajouté au panier")}
          >
            <Text style={styles.buttonText}>Ajouter au panier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => {
              setSelectedPizza(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Détails</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading pizzas...</Text>
      ) : (
        <FlatList
          data={pizzas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {selectedPizza && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Ingrédients</Text>
            <Text>{selectedPizza.ingredients.join(", ")}</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 8,
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E0B044",
    textTransform: "uppercase",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  addToCartButton: {
    backgroundColor: "#e06244",
    padding: 10,
    borderRadius: 8,
    marginLeft: 4,
  },
  detailsButton: {
    backgroundColor: "#E0B044",
    padding: 10,
    borderRadius: 8,
    marginLeft: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalView: {
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});