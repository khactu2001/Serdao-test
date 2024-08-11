import localStorage, { LOCAL_KEYS } from "./local-storage";

class TransactionService {
  async loadTransactions(): Promise<any> {
    const transactions = await localStorage.getItem(LOCAL_KEYS.TRANSACTIONS);
    return transactions;
  }

  async saveTransactions(transactions: any) {
    await localStorage.setItem(LOCAL_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }
}

const transactionService = new TransactionService();
export default transactionService;