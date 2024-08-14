import React, {createContext, useContext, useEffect, useState} from 'react';
import localStorage, {LOCAL_KEYS} from '../../services/local-storage';
import {Transaction} from './type';

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

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadInitialBalance = async () => {
      try {
        const data = await localStorage.getData(LOCAL_KEYS.BALANCE);
        if (data === null || isNaN(data)) {
          setBalance(1000);
          return;
        }
        setBalance(parseFloat(data)); // Update state after data is loaded
      } catch (error) {}
    };

    const loadInitialTransactions = async () => {
      try {
        const data = await localStorage.getData(LOCAL_KEYS.TRANSACTIONS);
        if (data) {
          setTransactions(data); // Update state after data is loaded
        }
      } catch (error) {}
    };

    loadInitialBalance();
    loadInitialTransactions();
  }, []);

  const saveTransactions = async (newTransactions: Transaction[]) => {
    await localStorage.saveData(LOCAL_KEYS.TRANSACTIONS, newTransactions);
  };
  const saveBalance = async (newBalance: number) => {
    await localStorage.saveData(LOCAL_KEYS.BALANCE, newBalance);
  };

  const addTransaction = (amount: string, account: Transaction['account']) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };

    // set and save local transactions
    setTransactions(prevTransactions => {
      saveTransactions([...prevTransactions, newTransaction]);
      return [...prevTransactions, newTransaction];
    });

    // set and save local balance
    setBalance(prevBalance => {
      saveBalance(prevBalance - parseFloat(amount));
      return prevBalance - parseFloat(amount);
    });
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
