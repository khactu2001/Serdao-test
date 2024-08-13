import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTransactions} from './TransactionContext';
import {validateIban} from '../../services/validation';
import BeneficiariesModal from './components/BeneficiariesModal';

const TransactionScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const {addTransaction, balance} = useTransactions();

  const handleTransaction = () => {
    if (amount === '' || name === '' || iban === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!validateIban(iban)) {
      Alert.alert(
        'Error',
        'Invalid IBAN. Please enter a valid IBAN in format BE68539007547034',
      );
      return;
    }
    const amountTransaction = parseFloat(amount);
    if (amountTransaction > balance) {
      Alert.alert('Error', `Insufficient balance. ${balance}$ remaining`);
      return;
    }
    const accountDetails = {name, iban};
    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  const onSelectPerson = person => {
    const {account} = person;
    console.log(person);
    setName(`${account.firstName} ${account.lastName}`);
    setIban(account.iban);
    setModalVisible(false);
  };

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
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}>
        <TextInput
          style={{
            flex: 1,
          }}
          onChangeText={setName}
          value={name}
          placeholder="Recipient Name"
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/ic_list_users.png')}
            style={{width: 20, height: 20, marginHorizontal: 5}}
          />
        </TouchableOpacity>
      </View>
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
      <Button title="Submit Transaction" onPress={handleTransaction} />

      <BeneficiariesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSelect={onSelectPerson}
      />
    </View>
  );
};

export default TransactionScreen;
