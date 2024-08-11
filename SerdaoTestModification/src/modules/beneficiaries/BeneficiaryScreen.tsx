import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useBeneficiaries} from './BeneficiaryContext';

const BeneficiaryScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  // const {addBeneficiary} = useBeneficiaries();

  const handleBeneficiary = () => {
    const accountDetails = {name, iban};
    // addBeneficiary(amount, accountDetails);
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Beneficiary" onPress={handleBeneficiary} />
    </View>
  );
};

export default BeneficiaryScreen;
