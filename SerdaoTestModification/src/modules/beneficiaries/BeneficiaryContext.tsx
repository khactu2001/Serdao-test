import React, {createContext, useState, useContext} from 'react';

const BeneficiaryContext = createContext();

export const useBeneficiaries = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider = ({children}) => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  const addBeneficiary = (amount, account) => {
    const newBeneficiary = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setBeneficiaries(prevBeneficiaries => [
      ...prevBeneficiaries,
      newBeneficiary,
    ]);
  };

  return (
    <BeneficiaryContext.Provider value={{beneficiaries, addBeneficiary}}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
