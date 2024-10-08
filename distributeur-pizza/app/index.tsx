import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { router } from "expo-router";


const { width } = Dimensions.get("window");

export default function Index() {
  return (
    <View style={styles.container} accessibilityLanguage="fr-FR">
      <Navbar />

      {/* Utiliser ScrollView pour permettre le défilement */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={
            width > 950 ? styles.presentationRow : styles.presentationColumn
          }
          accessibilityLanguage="fr-FR"
        >
          <View style={styles.textSection}>
            <Text style={styles.heading} accessibilityLanguage="fr-FR">Bienvenue chez Spizzico</Text>
            <Text style={styles.subtitle} accessibilityLanguage="fr-FR">
              Une tradition culinaire depuis 1950
            </Text>
            <Text style={styles.description}>
              Depuis sa fondation en 1950, Spizzico incarne la quintessence de la
              pizza italienne authentique à Rome, dans le quartier pittoresque
              de Trastevere. Fondée par Giovanni Rossi, un passionné de cuisine
              italienne, notre pizzeria a su conquérir le cœur et les papilles
              de plusieurs générations de clients fidèles.
            </Text>

            <Text style={styles.subtitle} accessibilityLanguage="fr-FR">
              Une recette familiale, une tradition préservée
            </Text>
            <Text style={styles.description} accessibilityLanguage="fr-FR">
              Nichée dans le quartier historique de Trastevere, Spizzico a été le
              fruit de la recette originale de Giovanni, inspirée des traditions
              culinaires napolitaines. Cette recette, inchangée depuis sa
              création, utilise des ingrédients simples soigneusement
              sélectionnés pour créer une pâte fine et croustillante, cuite à la
              perfection dans notre four à bois traditionnel.
            </Text>

            <Text style={styles.subtitle} accessibilityLanguage="fr-FR">
              Une expérience gastronomique inégalée
            </Text>
            <Text style={styles.description} accessibilityLanguage="fr-FR">
              Devenue une institution locale au fil des décennies, Spizzico est
              réputée pour son ambiance conviviale et accueillante, où familles,
              amis et passionnés de cuisine se réunissent pour savourer des
              moments uniques. Notre menu, enrichi tout en respectant nos
              racines, propose une variété de pizzas artisanales préparées avec
              des ingrédients frais et de première qualité.
            </Text>

            {/* Bouton Voir nos pizzas */}
            <TouchableOpacity
              accessible={true}
              accessibilityHint="Appuyez pour voir le menu des pizzas"
              accessibilityLabel="Voir nos pizzas"
              accessibilityLanguage="fr-FR"
              onPress={() => router.push("/pizzas")}
              style={styles.button}
            >
              <Text style={styles.buttonText} accessibilityLanguage="fr-FR">Voir nos pizzas</Text>
            </TouchableOpacity>
          </View>

          {/* Image principale */}
          <Image
            source={require("../assets/illustration.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: "#fff",
  },
  scrollContainer: {
    marginTop: 100,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  presentationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 1500,
    padding: 20,
  },
  presentationColumn: {
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 1500,
    padding: 20,
  },
  textSection: {
    flex: 1,
    paddingRight: width > 950 ? 20 : 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E0B044",
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e06244",
    paddingBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#000",
    paddingBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#E0B044",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  image: {
    width: "100%",
    height: 400, // Ajuste la hauteur de l'image
    maxWidth: 700,
  },
});
