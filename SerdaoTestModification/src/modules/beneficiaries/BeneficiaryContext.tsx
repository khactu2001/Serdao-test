import React, {createContext, useContext, useState} from 'react';

const BeneficiaryContext = createContext();

export const useBeneficiaries = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider = ({children}) => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  const addBeneficiary = account => {
    const newBeneficiary = {
      id: Date.now(),
      account,
    };
    setBeneficiaries(prevBeneficiaries => [
      ...prevBeneficiaries,
      newBeneficiary,
    ]);
  };
  console.log(beneficiaries);

  return (
    <BeneficiaryContext.Provider value={{beneficiaries, addBeneficiary}}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
