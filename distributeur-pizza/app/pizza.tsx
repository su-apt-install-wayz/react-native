import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import axios from 'axios';
import { useLocalSearchParams  } from "expo-router";

interface Pizza {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

export default function PizzaDetail({ route }: { route: { params: { id: number } } }) {
  const { id } = useLocalSearchParams ();
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPizza = async () => {
    try {
      const response = await axios.get(`http://192.168.1.154:3000/pizzas/${id}`);
      setPizza(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizza();
  }, []);

  if (loading) {
    return <Text>Loading pizza details...</Text>;
  }

  if (!pizza) {
    return <Text>Pizza not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: pizza.image_url }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{pizza.name}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>{pizza.price}€</Text>
        <Text style={styles.description}>{pizza.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 100,
  },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 8,
    alignItems: "center",
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
    marginTop: 20,
    padding: 8,
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
