import React, {createContext, useContext, useEffect, useState} from 'react';
import {Beneficiary} from './type';
import localStorage, {LOCAL_KEYS} from '../../services/local-storage';

export type BeneficiaryProps = {
  beneficiaries: Beneficiary[];
  addBeneficiary: (account: Beneficiary['account']) => void;
};

export const BeneficiaryContext = createContext<BeneficiaryProps>({
  beneficiaries: [],
  addBeneficiary: () => {},
});

export const useBeneficiaries = () => {
  return useContext(BeneficiaryContext);
};

export const BeneficiaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {
    const loadInitialBeneficiaries = async () => {
      const data = await localStorage.getData(LOCAL_KEYS.BENEFICIARIES);
      if (data) {
        setBeneficiaries(data); // Update state after data is loaded
      }
    };
    loadInitialBeneficiaries();
  }, []);

  const addBeneficiary = (account: Beneficiary['account']) => {
    const newBeneficiary: Beneficiary = {
      id: Date.now(),
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
