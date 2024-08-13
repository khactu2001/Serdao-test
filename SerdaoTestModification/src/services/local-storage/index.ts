import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCAL_KEYS = {
  TRANSACTIONS: 'transactions',
  BALANCE: 'balance',
  BENEFICIARIES: 'beneficiaries',
};

class LocalStorage {
  // Save data to AsyncStorage
  saveData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Error saving data", e);
    }
  };

  // Retrieve data from AsyncStorage
  getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Error retrieving data", e);
    }
  };
}
const localStorage = new LocalStorage();
export default localStorage;