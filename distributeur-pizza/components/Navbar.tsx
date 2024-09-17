import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.nav}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    zIndex: 100,
  },
  logo: {
    maxWidth: 130,
    resizeMode: 'contain',
  },
});

export default Navbar;