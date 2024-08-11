import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCAL_KEYS = {
  TRANSACTIONS: 'transactions',
  BALANCE: 'balance',
};

class LocalStorage {
  async getItem(key: string) {
    const item = await AsyncStorage.getItem(key);
    return item;
  }

  async setItem(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  // async getTransactions(key: string) {
  //   const transactions = await this.getItem(LOCAL_KEYS.TRANSACTIONS);
  //   return transactions ? JSON.parse(transactions) : [];
  // }

  // async getBalance() {
  //   const balance = await this.getItem(LOCAL_KEYS.BALANCE);
  //   return balance ? parseFloat(balance) : 0;
  // }

}
const localStorage = new LocalStorage();
export default localStorage;