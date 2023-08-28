import React, { useCallback } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Linking,
  Alert,
  Button,
} from 'react-native';
import { Block } from 'galio-framework';

const redirectWhatsApp = 'https://wa.me/+55-(14)991038089';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export const BlockModal = ({
  isVisible,
  handleRedirect,
  handleReturn,
  title,
  children,
  description,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleReturn}
      >
        <TouchableOpacity style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            <View style={styles.modalButton}>
              {!children ? (
                <Block flex row>
                  <Pressable style={[styles.button, styles.buttonReturn]} onPress={handleReturn}>
                    <Text style={styles.textStyle}>Voltar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonRedirect]}
                    onPress={handleRedirect}
                  >
                    <OpenURLButton url={redirectWhatsApp} style={styles.textStyle}>
                      Entrar em contato
                    </OpenURLButton>
                  </Pressable>
                </Block>
              ) : (
                children
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 15,
    height: 300,
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
    marginRight: 20,
  },
  button: {
    height: 40,
    marginHorizontal: 5,
    width: '50%',
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonReturn: {
    backgroundColor: '#2196F3',
  },
  buttonRedirect: {
    backgroundColor: '#1be611',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  modalDescription: {
    marginBottom: 35,
    fontSize: 16,
    textAlign: 'center',
  },
});
