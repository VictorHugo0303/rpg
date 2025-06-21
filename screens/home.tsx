import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation'; // ajuste esse caminho conforme a localização do seu navigation.tsx

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const iniciar = () => {
    navigation.navigate('Aventura');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚔️Bem-vindo à Jornada Épica!🏹</Text>
      <TouchableOpacity style={styles.customButton} onPress={iniciar}>
        <Text style={styles.buttonText}>Iniciar Aventura</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFCFB',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  customButton: {
    backgroundColor: '#090040',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
