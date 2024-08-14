import React, {createContext, useState, useContext, useEffect} from 'react';
import {Transaction} from './type';
import localStorage, {LOCAL_KEYS} from '../../services/local-storage';

const TransactionContext = createContext<TransactionProps>({
  transactions: [],
  balance: 0,
  addTransaction: () => {},
  updateBalance: () => {},
});

export type TransactionProps = {
  transactions: Transaction[];
  balance: number;
  addTransaction: (amount: string, account: Transaction['account']) => void;
  updateBalance: (newBalance: number) => void;
};

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    const loadInitialBalance = async () => {
      const data = await localStorage.getData(LOCAL_KEYS.BALANCE);
      if (data) {
        setBalance(parseFloat(data)); // Update state after data is loaded
      }
    };

    const loadInitialTransactions = async () => {
      const data = await localStorage.getData(LOCAL_KEYS.TRANSACTIONS);
      if (data) {
        setTransactions(data); // Update state after data is loaded
      }
    };

    loadInitialBalance();
    loadInitialTransactions();
  }, []);

  useEffect(() => {
    localStorage.saveData(LOCAL_KEYS.TRANSACTIONS, transactions);
    localStorage.saveData(LOCAL_KEYS.BALANCE, balance);
  }, [transactions]);

  const addTransaction = (amount: string, account: Transaction['account']) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance, updateBalance}}>
      {children}
    </TransactionContext.Provider>
  );
};
