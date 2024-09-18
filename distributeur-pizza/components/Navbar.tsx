import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Navbar = () => {
  const router = useRouter();

  return (
    <View style={styles.nav}>      
      <TouchableOpacity onPress={() => router.push("/")}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </TouchableOpacity>

      {/* Bouton Panier */}
      <TouchableOpacity
        onPress={() => router.push("/cart")}
        style={styles.cartButton}
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
