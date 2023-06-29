import { Block, theme } from 'galio-framework';
import React from 'react';

import { Modal as ModalRN, StyleSheet, Text, Pressable, View } from 'react-native';

export const Modal = ({ isVisible, handleConfirm, handleCancel, title, children }) => {
  return (
    <ModalRN
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <View style={styles.modalButton}>
            {!children ? (
              <Block>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleCancel}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonEdit]} onPress={handleConfirm}>
                  <Text style={styles.textStyle}>Confirmar</Text>
                </Pressable>
              </Block>
            ) : (
              children
            )}
          </View>
        </View>
      </View>
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor: 'black',
    // opacity: 0.6
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.BASE,
  },
  button: {
    height: 40,
    margin: 10,
    width: '40%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#CAD1D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonEdit: {
    backgroundColor: '#1be611',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
