import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    router.push("/pizzas")
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Formulaire de connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={form.firstName}
        onChangeText={(value) => handleInputChange('firstName', value)}
        accessible={true}
        accessibilityLabel="Entrez votre nom"
        accessibilityHint="Champ de saisie pour votre nom"
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={form.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
        accessible={true}
        accessibilityLabel="Entrez votre prénom"
        accessibilityHint="Champ de saisie pour votre prénom"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(value) => handleInputChange('email', value)}
        accessible={true}
        accessibilityLabel="Entrez votre adresse email"
        accessibilityHint="Champ de saisie pour votre adresse email"
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={form.address}
        onChangeText={(value) => handleInputChange('address', value)}
        accessible={true}
        accessibilityLabel="Entrez votre adresse"
        accessibilityHint="Champ de saisie pour votre adresse postale"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        value={form.password}
        onChangeText={(value) => handleInputChange('password', value)}
        accessible={true}
        accessibilityLabel="Entrez votre mot de passe"
        accessibilityHint="Champ de saisie pour votre mot de passe"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        accessible={true}
        accessibilityLabel="Bouton de connexion"
        accessibilityHint="Appuyez pour soumettre vos informations de connexion"
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E0B044',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Login;
