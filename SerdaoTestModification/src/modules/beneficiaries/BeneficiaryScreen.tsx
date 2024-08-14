import React, {useEffect, useState} from 'react';
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
import {Beneficiary} from './type';
import localStorage, {LOCAL_KEYS} from '../../services/local-storage';

const BeneficiaryScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');

  const {addBeneficiary, beneficiaries} = useBeneficiaries();

  useEffect(() => {
    localStorage.saveData(LOCAL_KEYS.BENEFICIARIES, beneficiaries);
  }, [beneficiaries]);

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setIban('');
  };

  const handleBeneficiary = () => {
    const firstNameTrimmed = firstName.trim();
    const lastNameTrimmed = lastName.trim();
    const ibanTrimmed = iban.trim();

    // validate fields
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
        'Invalid IBAN. Please enter a valid IBAN in format. Ex: BE68539007547034',
      );
      return;
    }
    const accountDetails: Beneficiary['account'] = {
      firstName: firstNameTrimmed,
      lastName: lastNameTrimmed,
      iban: ibanTrimmed,
    };

    // add beneficiary
    addBeneficiary(accountDetails);

    // clear fields
    resetFields();
  };

  const renderItem = ({item}: {item: Beneficiary}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>
            First name: {item.account.firstName}
          </Text>
          <Text style={styles.itemText}>
            Last name: {item.account.lastName}
          </Text>
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
