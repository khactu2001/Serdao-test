import React, {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {validateIban} from '../../services/validation';
import {useBeneficiaries} from './BeneficiaryContext';
var IBAN = require('iban');
console.log(IBAN.isValid('hello world')); // false
console.log(IBAN.isValid('BE68539007547034')); // true')

const BeneficiaryScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('123');
  const [lastName, setLastName] = useState('123');
  const [iban, setIban] = useState('BE68539007547034');
  const {addBeneficiary, beneficiaries} = useBeneficiaries();

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setIban('');
  };

  const handleBeneficiary = () => {
    const firstNameTrimmed = firstName.trim();
    const lastNameTrimmed = lastName.trim();
    const ibanTrimmed = iban.trim();
    if (
      firstNameTrimmed.trim() === '' ||
      lastNameTrimmed.trim() === '' ||
      ibanTrimmed.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!validateIban(ibanTrimmed)) {
      Alert.alert(
        'Error',
        'Invalid IBAN. Please enter a valid IBAN in format BE68539007547034',
      );
      return;
    }
    const accountDetails = {
      firstName: firstNameTrimmed,
      lastName: lastNameTrimmed,
      iban: ibanTrimmed,
    };
    addBeneficiary(accountDetails);

    // open this comment
    // resetFields();
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      {/* <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text> */}
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.firstName}</Text>
          <Text style={styles.itemText}>To: {item.account.lastName}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Beneficiary first name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Beneficiary last name"
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
        placeholder="Beneficiary IBAN"
      />
      <Button title="Create Beneficiary" onPress={handleBeneficiary} />

      <FlatList
        data={beneficiaries}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={<></>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default BeneficiaryScreen;
