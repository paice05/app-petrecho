import { Block, Text } from "galio-framework";
import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

import { LoadingOverlay } from "../../components/LoadingOverlay";
import { nowTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

const RegisterForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Block>
      <LoadingOverlay visible={loading} />
      <Block style={styles.registerContainer}>
        <Text style={{ textAlign: "center" }} size={18}>
          Meu Petrecho - Cadastro
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
});
export default RegisterForm;
