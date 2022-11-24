import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToAsyncStorage = async (name, data) => {
  await AsyncStorage.setItem(name, JSON.stringify(data));
};

export const getFromAsyncStorage = async (name) => {
  const data = await AsyncStorage.getItem(name);

  return data ? JSON.parse(data) : null;
};

export const removeFromAsyncStorage = async (name) => {
  await AsyncStorage.removeItem(name);
};
