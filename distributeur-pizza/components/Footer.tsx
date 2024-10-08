import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer} accessibilityLanguage="fr-FR">
      <Image
        source={require('../assets/logo_footer.png')}
        style={styles.logo}
        accessible={true}
        accessibilityLabel="Logo Spizzico"
        accessibilityHint="Ceci est le logo du restaurant Spizzico"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    padding: 20,
    backgroundColor: '#E0B044',
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    height: 80, // Ajustez en fonction de la taille souhaitée
    resizeMode: 'contain',
  },
});

export default Footer;
