import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCache = async (key, valor) => AsyncStorage.setItem(key, valor);
export const getCache = async (key) => AsyncStorage.getItem(key);
export const clearCache = async (key) => AsyncStorage.removeItem(key);
