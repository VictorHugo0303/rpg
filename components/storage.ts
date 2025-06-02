import AsyncStorage from '@react-native-async-storage/async-storage';
import { Aventura } from './generator';

export async function salvarAventura(aventura: Aventura): Promise<void> {
  const jsonValue = JSON.stringify(aventura);
  await AsyncStorage.setItem('@aventura_atual', jsonValue);
}

export async function carregarAventura(): Promise<Aventura | null> {
  const jsonValue = await AsyncStorage.getItem('@aventura_atual');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}