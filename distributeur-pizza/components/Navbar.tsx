import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Navbar = () => {
  const router = useRouter();

  return (
    <View style={styles.nav} accessibilityLanguage="fr-FR">
      {/* Logo avec accessibilité */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        accessibilityLanguage="fr-FR"
        accessible={true}
        accessibilityLabel="Retour à l'accueil"
        accessibilityHint="Appuyez pour revenir à la page d'accueil"
        accessibilityRole="button"
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </TouchableOpacity>
      
      {/* page login */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        accessibilityLanguage="fr-FR"
        accessible={true}
        accessibilityLabel="page de login"
        accessibilityHint="Appuyez pour allez sur la page de login"
        accessibilityRole="button"
      >
        <Text accessibilityLanguage="fr-FR">
          Login
        </Text>
      </TouchableOpacity>

      {/* Bouton Panier avec accessibilité */}
      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={styles.cartButton}
        accessibilityLanguage="fr-FR"
        accessible={true}
        accessibilityLabel="Panier"
        accessibilityHint="Appuyez pour accéder au panier"
        accessibilityRole="button"
      >
        <Ionicons name="cart-outline" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    zIndex: 100,
  },
  logo: {
    maxWidth: 130,
    height: 100,
    resizeMode: "contain",
  },
  cartButton: {
    padding: 10,
  },
});

export default Navbar;
