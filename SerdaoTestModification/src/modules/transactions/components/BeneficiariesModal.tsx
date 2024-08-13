import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBeneficiaries} from '../../beneficiaries/BeneficiaryContext';

const ic_close = require('../../../assets/ic_close.png');

const BeneficiariesModal = ({
  modalVisible,
  setModalVisible,
  onSelect,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onSelect: (value: any) => void;
}) => {
  const {beneficiaries} = useBeneficiaries();
  const showModalHeader = () => {
    return (
      <View style={styles.row}>
        <View style={{width: 28, height: 28, opacity: 0}} />
        <Text style={styles.modalText}>Select a beneficiary</Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image source={ic_close} style={{width: 28, height: 28}} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {account} = item;
    const {firstName, lastName, iban} = account;
    const fullname = firstName + ' ' + lastName;
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(item);
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.item}>
          <Text style={styles.itemFullName}>{fullname}</Text>
          <Text style={styles.itemIBAN}>{iban}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {showModalHeader()}
            <FlatList
              data={beneficiaries}
              contentContainerStyle={{paddingVertical: 16}}
              style={{flex: 1}}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
  item: {
    // backgroundColor: '#f9f9f9',
    padding: 10,
  },
  itemFullName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemIBAN: {
    fontSize: 14,
    marginTop: 5,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'lightgrey',
  },
});

export default BeneficiariesModal;
