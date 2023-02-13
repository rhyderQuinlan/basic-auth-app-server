import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (name: string) => await AsyncStorage.getItem(name);

export const setItem = async (name: string, value: any) =>
  await AsyncStorage.setItem(name, value);

export const removeItem = async (name: string) =>
  await AsyncStorage.removeItem(name);
