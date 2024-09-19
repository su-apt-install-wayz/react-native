import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocalSearchParams } from "expo-router";
import { updateQuantity, addToCart } from './redux/cartSlice'; // Importer `addToCart`
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { useRouter } from "expo-router"; // Assurez-vous d'importer useRouter

interface Pizza {
    id: number;
    name: string;
    price: number;
    image_url: string;
    description: string;
}

export default function PizzaDetail({ route }: { route: { params: { id: number } } }) {
    
  const router = useRouter(); // Utilisation de useRouter pour la navigation
    const { id } = useLocalSearchParams();
    const [pizza, setPizza] = useState<Pizza | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Récupérer l'état du panier pour cette pizza
    const cartItem = useSelector((state: RootState) =>
        state.cart.items.find((item) => item.id === Number(id))
    );

    const fetchPizza = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pizzas/${id}`);
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

    // Si la page est en cours de chargement
    if (loading) {
        return <Text>Loading pizza details...</Text>;
    }

    // Si la pizza n'est pas trouvée
    if (!pizza) {
        return <Text>Pizza not found</Text>;
    }

    return (
      <>
        <Navbar />
        <View style={styles.container}>
            <Image source={{ uri: pizza.image_url }} style={styles.image} />
            <View style={styles.header}>
                <Text style={styles.headerText}>{pizza.name}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.price}>{pizza.price}€</Text>
                <Text style={styles.description}>{pizza.description}</Text>
            </View>

            {/* Affichage et gestion de la quantité */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => dispatch(updateQuantity({ id: Number(id), action: "decrement", pizza }))} // Diminuer la quantité
                >
                    <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{cartItem?.quantity || 1}</Text>

                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => dispatch(updateQuantity({ id: Number(id), action: "increment", pizza }))} // Augmenter la quantité
                >
                    <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Bouton pour ajouter la pizza au panier */}
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                    dispatch(addToCart({... pizza, quantity: cartItem?.quantity || 1}));  // Ajouter la pizza au panier
                    router.push("/cart");
                    Alert.alert("Ajouté au panier", `${pizza.name} a été ajouté au panier`);
                }}
            >
                <Text style={styles.buttonText}>Ajouter au panier</Text>
            </TouchableOpacity>
        </View>
        <Footer />
      </>
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
        marginTop: 30,
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
    quantityContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 10,
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
    addToCartButton: {
        backgroundColor: "#E0B044",
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
