import { Block, theme } from "galio-framework";
import React from "react";

import {
  Modal as ModalRN,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useColorContext } from "../../context/colors";

const width = Dimensions.get("screen").width;

export const Modal = ({
  isVisible,
  handleConfirm,
  handleCancel,
  title,
  children,
}) => {
  const { colors } = useColorContext();

  return (
    <View>
      <ModalRN
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleCancel}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={handleCancel}>
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            <View
              style={[
                styles.modalView,
                { backgroundColor: colors.BACKGROUND_CARD },
              ]}
            >
              {title && (
                <Text style={[styles.modalText, { color: colors.TEXT }]}>
                  {title}
                </Text>
              )}
              <View style={styles.modalButton}>
                {!children ? (
                  <Block flex row>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={handleCancel}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonEdit]}
                      onPress={handleConfirm}
                    >
                      <Text style={styles.textStyle}>Confirmar</Text>
                    </Pressable>
                  </Block>
                ) : (
                  children
                )}
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </ModalRN>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: 'black',
    // opacity: 0.6
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    minHeight: 400,
    width: width * 0.8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingHorizontal: theme.SIZES.BASE,
    // marginRight: 20,
  },
  button: {
    height: 40,
    marginHorizontal: 5,
    width: "50%",
    borderRadius: 20,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#CAD1D7",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonEdit: {
    backgroundColor: "#1be611",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
