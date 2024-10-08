import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/modules/home/HomeScreen';
import {TransactionProvider} from './src/modules/transactions/TransactionContext';
import TransactionScreen from './src/modules/transactions/TransactionScreen';
import BeneficiaryScreen from './src/modules/beneficiaries/BeneficiaryScreen';
import {BeneficiaryProvider} from './src/modules/beneficiaries/BeneficiaryContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <BeneficiaryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen name="Beneficiary" component={BeneficiaryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BeneficiaryProvider>
    </TransactionProvider>
  );
};

export default App;
