import React from "react";
import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingOverlay = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    marginTop: 10,
  },
});
